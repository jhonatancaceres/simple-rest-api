import { Request, Response } from 'express';

const messages: { path: string; type: 'string'; text: string }[] = [];

export const messageController = {
  getElements: async (req: Request, res: Response) => {

    res.json(messages);
  },

  createElement: async (req: Request, res: Response) => {

    console.log(req.body)
    const item = req.body;

    messages.push(item);

    res.json(item);
  },
  deleteAll: async (req: Request, res: Response) => {
    messages.forEach(it => messages.pop());
    res.json(`Done: ${messages.length}`);
  }


};