import Redis from '../../redis/Redis';
import { CronJob } from '../types';
import { DateTimeLib } from '../../time/types';
import TemporalTimeService from '../../time/TemporalTimeService';
import MessageGenerator from '../../bot/generator/MessageGenerator';
import Bot from '../../bot/Bot';
import PowerManager from '../../../managers/PowerManager';
import { DeviceStatus } from '../../../entities/PowerStatus.entity';

class CheckDeviceStatusJob implements CronJob {
  private static HEARTBEAT_LIMIT = 5 * 60000; // 5 minutes
  private messageGenerator = new MessageGenerator();

  private bank: Redis;
  private bot: Bot;
  private timeService: DateTimeLib;
  private powerManager: PowerManager;

  constructor() {
    this.bank = Redis.getInstance();
    this.bot = Bot.getInstance();
    this.timeService = new TemporalTimeService();
    this.powerManager = new PowerManager();
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

    // DISCONNECTED
    if (limitReached && isConnected) {
      const message = this.messageGenerator.disconnectMessage(this.timeService.formatTime(this.timeService.now()));
      await this.bank.storeKey(Redis.DEVICE_STATUS_KEY, Redis.DEVICE_STATUSES.DISCONNECTED);
      await this.bank.storeKey(Redis.DISCONNECTED_AT_KEY, lastHeartbeat);
      await this.powerManager.storeStatus(DeviceStatus.DISCONNECTED, lastHeartbeat);
      await this.bot.sendMessage(message);
      return;
    }

    // CONNECTED
    if (!limitReached && !isConnected) {
      const disconnectedAt = await this.bank.getKey(Redis.DISCONNECTED_AT_KEY);
      const now = this.timeService.now();
      await this.powerManager.storeStatus(DeviceStatus.CONNECTED, now);
      let blackoutTimeStr: string | undefined;
      if (disconnectedAt) {
        const diffDuration = this.timeService.subtract(now, disconnectedAt);
        blackoutTimeStr = this.messageGenerator.blackoutString(diffDuration);
      }

      const message = this.messageGenerator.connectMessage(this.timeService.formatTime(now), blackoutTimeStr);

      await this.bank.storeKey(Redis.DEVICE_STATUS_KEY, Redis.DEVICE_STATUSES.CONNECTED);
      await this.bank.removeKey(Redis.DISCONNECTED_AT_KEY);
      await this.bot.sendMessage(message);
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
