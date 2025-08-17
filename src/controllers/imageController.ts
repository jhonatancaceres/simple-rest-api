
import { Request, Response } from 'express';
import { imageService } from '../services/imageService';
import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '../lib/prisma';
import { getMimeType } from '../utils/imageUtils';



export const imageController = {

  uploadImage: async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const savedImage = await imageService.createElement({ ...req.file, originalName: req.file.originalname } as any);

      res.json({
        message: 'Image uploaded successfully',
        image: {
          id: savedImage.id,
          filename: savedImage.filename,
          url: `/api/images/${req.params.folder || 'general'}/${req.file.filename}`
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  },

  getImage: async (req: Request, res: Response): Promise<any> => {
    try {
      const { folder, filename } = req.params;
      const imagePath = path.join(process.cwd(), 'uploads', 'images', folder, filename);

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Get file stats for headers
      const stats = fs.statSync(imagePath);
      const mimeType = getMimeType(filename);

      // Set appropriate headers
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Length', stats.size);
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      // Stream the file
      const fileStream = fs.createReadStream(imagePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving image:', error);
      res.status(500).json({ error: 'Error serving image' });
    }
  },
  getImageByFilename: async (req: Request, res: Response): Promise<any> => {
    try {
      const { filename } = req.params;

      const dbImage = await prisma.image.findFirst({ where: { filename } })
      const imagePath = dbImage?.filePath || '';

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Get file stats for headers
      const stats = fs.statSync(imagePath);
      const mimeType = getMimeType(filename);

      // Set appropriate headers
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Length', stats.size);
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      // Stream the file
      const fileStream = fs.createReadStream(imagePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving image:', error);
      res.status(500).json({ error: 'Error serving image' });
    }
  },

  deleteImage: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      // Find image in database
      const image = await prisma.image.findUnique({
        where: { id: parseInt(id) }
      });

      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Delete physical file
      if (fs.existsSync(image.filePath)) {
        fs.unlinkSync(image.filePath);
      }

      // Delete from database
      await prisma.image.delete({
        where: { id: parseInt(id) }
      });

      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Delete failed' });
    }
  }
};