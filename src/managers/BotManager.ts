import Bot from '../services/bot/Bot';
import Redis from '../services/redis/Redis';
import { DateTimeLib } from '../services/time/types';
import TemporalTimeService from '../services/time/TemporalTimeService';

type DeviceStatus = 'connected' | 'disconnected';

class BotManager {
  private static HEARTBEAT_KEY = 'lastHeartbeat:';
  private static DEVICE_STATUS_KEY = 'status:';
  private static DEVICE_STATUSES: { [key: string]: DeviceStatus } = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
  };
  private static HEARTBEAT_LIMIT = 60000; // 1 minute
  private bot: Bot;
  private bank: Redis;
  private timeService: DateTimeLib;

  constructor() {
    this.bot = new Bot();
    this.bank = new Redis();
    this.timeService = new TemporalTimeService();
  }

  public async handleHeartbeat() {
    const lastHeartbeat = await this.bank.getKey(BotManager.HEARTBEAT_KEY);

    const currentStatus = await this.bank.getKey(BotManager.DEVICE_STATUS_KEY);
    if (currentStatus === BotManager.DEVICE_STATUSES.DISCONNECTED) {
      await this.bank.storeKey(BotManager.DEVICE_STATUS_KEY, BotManager.DEVICE_STATUSES.CONNECTED);
      await this.bank.storeKey(BotManager.HEARTBEAT_KEY, this.timeService.now());
      await this.bot.sendMessage(`Device is connected, Last heartbeat: ${lastHeartbeat}`);
      return;
    }

    if (lastHeartbeat && this.timeToSendMessage(lastHeartbeat)) {
      await this.bank.storeKey(BotManager.DEVICE_STATUS_KEY, BotManager.DEVICE_STATUSES.DISCONNECTED);
      await this.bot.sendMessage(`Device is disconnected Last heartbeat: ${lastHeartbeat}`);
    } else {
      await this.bank.storeKey(BotManager.HEARTBEAT_KEY, this.timeService.now());
    }
  }

  private timeToSendMessage(lastHeartbeat: string) {
    const now = this.timeService.now();
    return this.timeService.diffMoreThenLimit(now, lastHeartbeat, BotManager.HEARTBEAT_LIMIT);
  }
}

export default BotManager;
