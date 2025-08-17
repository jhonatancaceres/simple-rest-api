import { Request, Response } from 'express';

const responses: { [path: string]: any } = {};

export const processController = {

  getElements: async (req: Request, res: Response) => {
    res.json(responses);
  },
  setDefaults: async (req: Request, res: Response) => {
    const flow = req.body.flow;
    const process = req.body.process;
    const path = `${flow}/${process}`;
    responses[path] = req.body.response;
    res.json(responses);
  },
  createElement: async (req: Request, res: Response) => {

    const flow = req.body.flow;
    const process = req.body.process;
    const path = `${flow}/${process}`;

    if (responses && responses[path]) {
      res.json(responses[path]);
    } else {
      const response = {
        path,
        statusCode: 1,
        statusText: 'success',
        errorCode: 0,
        errorMessage: ''
      }
      res.json(response);
    }
  },
};