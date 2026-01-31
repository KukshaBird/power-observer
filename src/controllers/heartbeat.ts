import { NextFunction, Request, Response } from 'express';
import BotManager from '../managers/BotManager';

// TODO: API_TOKEN as authorization header
export const postHeartbeat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const botManager = new BotManager();
    await botManager.handleHeartbeat();
    res.sendStatus(200);
    return;
  } catch (error) {
    next(error);
  }
};
