import { NextFunction, Request, Response } from 'express';

export const postHeartbeat = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  try {
    res.sendStatus(201);
    return;
  } catch (error) {
    next(error);
  }
};
