import { Request, Response } from 'express';

const responses: { [path: string]: { numberOfFails: number, counter: number } } = {};

const failResponse = {
  statusCode: 0,
  statusText: 'failed',
  errorCode: 100,
  errorMessage: 'Unexpected error'
};

const successResponse = {
  statusCode: 1,
  statusText: 'success',
  errorCode: 0,
  errorMessage: null
};

export const processController = {

  getElements: async (req: Request, res: Response) => {
    res.json(responses);
  },
  setDefaults: async (req: Request, res: Response) => {

    Object.entries<any>(req.body.processes).forEach(([path, value]) => {
      responses[path] = { numberOfFails: value.numberOfFails || 0, counter: 0 };
    });

    res.json(responses);
  },
  createElement: async (req: Request, res: Response) => {

    const flow = req.body.flow;
    const process = req.body.process;
    const path = `${flow}/${process}`;

    if (!responses[path]) {
      responses[path] = { numberOfFails: 0, counter: 0 };
    }

    const response = responses[path];

    if (response.counter < response.numberOfFails) {
      response.counter = response.counter + 1;
      res.json(failResponse);
    } else {
      response.counter = 0;
      res.json(successResponse);
    }
  },
};