import { prisma } from "../lib/prisma";


export const imageService = {

  createElement: async (image: any) => {
    return prisma.image.create({
      data: {
        filename: image.filename,
        originalName: image.originalname,
        filePath: image.path,
        fileSize: image.size,
        mimeType: image.mimetype
      }
    })
  },

  // used only for seed command
  getImageByOriginalName: async (originalName: string) => {

    const element = await prisma.image.findMany({
      where: { originalName },
    });

    return element;
  }
}