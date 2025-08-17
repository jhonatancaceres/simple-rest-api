import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
const { exec } = require('child_process');
import { Project } from '../src/types/project';
import { imageService } from '../src/services/imageService';
import { prisma } from '../src/lib/prisma';
import { generateFileName, getMimeType } from '../src/utils/imageUtils';



const users = async () => {
  const email = 'test@example.com';

  const user = await prisma.user.findMany({
    where: {
      email,
    },
  });

  if (user) {
    console.log(`User ${email} exists. No re-inserted.`);
    return;

  }

  await prisma.user.create({
    data: {
      email
    },
  });



  console.log(`Seeded users: ${email}`);
}

const findOrCreateImage = async (filename: string): Promise<{ id: number } | undefined> => {

  const [image] = await imageService.getImageByOriginalName(filename);

  if (image) {
    console.log('Exists')
    return image;
  }

  const sourcePath = path.join(__dirname, 'data/project-images', filename);
  const stats = await fs.statSync(sourcePath);
  const newFilename = generateFileName('image', filename);
  const destPath = path.join('uploads/images/general', newFilename);

  await fs.copyFileSync(sourcePath, destPath);

  const newImage = {
    originalname: filename,
    filename: generateFileName('image', filename),
    size: stats.size,
    path: destPath,
    mimetype: getMimeType(filename)
  };
  console.log('Created')
  return imageService.createElement(newImage);
}

const projects = async () => {

  await prisma.project.deleteMany();
  console.log('Deleted all existing projects');


  const filePath = path.join(process.cwd(), './prisma/data/projects.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = yaml.load(fileContent) as Project[];

  const projects = data.map(project => ({
    ...project, ...{ duration: `${project.duration}` }
  }));

  const newProjects = [];
  for (let project of projects) {
    const image = await findOrCreateImage(project.image);
    if (image) {
      newProjects.push({ ...project, imageId: image.id, image: undefined });
    }
  }

  // Insert projects into database
  await prisma.project.createMany({
    data: newProjects,
  });

  console.log(`Seeded ${newProjects.length} / ${projects.length} projects`);
}

async function main() {

  await users();
  await projects();

}

main().catch(e => console.error(e));
