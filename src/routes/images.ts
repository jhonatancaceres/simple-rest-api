import { Router } from 'express';
import { upload } from '../config/upload';
import { imageController } from '../controllers/imageController';
import { prisma } from '../lib/prisma';


const router = Router();

// Upload image to specific folder
router.post('/upload', upload.single('image'), imageController.uploadImage);
router.post('/upload/:folder', upload.single('image'), imageController.uploadImage);

// Serve images
router.get('/images/:folder/:filename', imageController.getImage);
router.get('/:filename', imageController.getImageByFilename);

// Delete image
//router.delete('/images/:id', imageController.deleteImage);

// Get all images (optional)
router.get('/all', async (req, res) => {
  const images = await prisma.image.findMany({
    select: {
      id: true,
      filename: true,
      originalName: true,
      filePath: true,
      createdAt: true
    }
  });

  const imagesWithUrls = images.map((img: any) => ({
    ...img,
    url: `/api/images/${img.filePath}`
  }));

  res.json(imagesWithUrls);
});

export default router;