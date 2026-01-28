import { CronJob } from '../types';
import Redis from '../../redis/Redis';
import { DateTimeLib } from '../../time/types';
import TemporalTimeService from '../../time/TemporalTimeService';
import Bot from '../../bot/Bot';

class CheckDeviceStatusJob implements CronJob {
  private static HEARTBEAT_LIMIT = 60000; // 1 minute

  private bank: Redis;
  private bot: Bot;
  private timeService: DateTimeLib;

  constructor() {
    this.bank = new Redis();
    this.bot = new Bot();
    this.timeService = new TemporalTimeService();
  }

  public async start() {
    console.log('Checking device status...');
    const lastHeartbeat = await this.bank.getKey(Redis.HEARTBEAT_KEY);
    const currentStatus = await this.bank.getKey(Redis.DEVICE_STATUS_KEY);
    const isConnected = currentStatus === Redis.DEVICE_STATUSES.CONNECTED;

    if (!lastHeartbeat) {
      console.log('No last heartbeat found. Skipping');
      return;
    }

    const limitReached = this.limitReached(lastHeartbeat);
    if (limitReached && isConnected) {
      await this.bank.storeKey(Redis.DEVICE_STATUS_KEY, Redis.DEVICE_STATUSES.DISCONNECTED);
      await this.bot.sendMessage('The device is disconnected now!');
      return;
    }

    if (!limitReached && !isConnected) {
      await this.bank.storeKey(Redis.DEVICE_STATUS_KEY, Redis.DEVICE_STATUSES.CONNECTED);
      await this.bot.sendMessage('The device is connected now!');
    } else {
      console.log('Stable state. Skipping');
    }
  }

  private limitReached(lastHeartbeat: string) {
    const now = this.timeService.now();
    return this.timeService.diffMoreThenLimit(now, lastHeartbeat, CheckDeviceStatusJob.HEARTBEAT_LIMIT);
  }
}

export default CheckDeviceStatusJob;
