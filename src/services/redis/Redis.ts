import { createClient, type RedisClientType } from 'redis';
import { DeviceStatus } from './types';

class Redis {
  public static HEARTBEAT_KEY = 'lastHeartbeat:';
  public static DEVICE_STATUS_KEY = 'status:';
  public static DISCONNECTED_AT_KEY = 'disconnectedAt:';
  public static DEVICE_STATUSES: { [key: string]: DeviceStatus } = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
  };

  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.connect().then(() => {});
  }

  private async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public async storeKey(key: string, value: string) {
    await this.client.set(key, value);
  }

  public async getKey(key: string) {
    return await this.client.get(key);
  }

  public async removeKey(key: string) {
    await this.client.del(key);
  }
}

export default Redis;
