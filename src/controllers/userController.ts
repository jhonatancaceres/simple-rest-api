import { Request, Response } from 'express';
import { prisma } from "../lib/prisma";

export const userController = {

  getElements: async (req: Request, res: Response) => {
    const elements = await prisma.user.findMany();
    res.json(elements);
  },

  getElementById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.json(user);
  },

  createElement: async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.json(user);
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

  deleteElement: async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'User deleted' });
  }
}