import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const projectController = {
  getElements: async (req: Request, res: Response) => {
    const elements = (await prisma.project.findMany(
      {
        orderBy: { createdAt: 'desc' },
        include: {
          image: { select: { filename: true } }
        }
      })).map(item => ({
        ...item, imageUrl: item.image.filename
      }));


    res.json(elements);
  },

  createElement: async (req: Request, res: Response) => {
    const item = await prisma.project.create({
      data: req.body
    });
    res.json(item);
  },
  updateElement: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, name },
    });
    res.json(user);
  },

  getElementById: async (req: Request, res: Response) => {
    const item = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    res.json(item);
  }
};