import Redis from '../services/redis/Redis';
import { DateTimeLib } from '../services/time/types';
import TemporalTimeService from '../services/time/TemporalTimeService';

class BotManager {
  private bank: Redis;
  private timeService: DateTimeLib;

  constructor() {
    this.bank = new Redis();
    this.timeService = new TemporalTimeService();
  }

  public async handleHeartbeat() {
    const now = this.timeService.now();
    await this.bank.storeKey(Redis.HEARTBEAT_KEY, now);
  }
}

export default BotManager;
