import Redis from '../services/redis/Redis';
import { DateTimeLib } from '../services/time/types';
import TemporalTimeService from '../services/time/TemporalTimeService';

class BotManager {
  private static instance: BotManager;
  private bank: Redis;
  private timeService: DateTimeLib;

  private constructor() {
    this.bank = Redis.getInstance();
    this.timeService = new TemporalTimeService();
  }

  public static getInstance(): BotManager {
    if (!BotManager.instance) {
      BotManager.instance = new BotManager();
    }
    return BotManager.instance;
  }

  public async handleHeartbeat() {
    const now = this.timeService.now();
    await this.bank.storeKey(Redis.HEARTBEAT_KEY, now);
  }
}

export default BotManager;
