import { NextFunction, Request, Response } from 'express';
import BotManager from '../managers/BotManager';

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
