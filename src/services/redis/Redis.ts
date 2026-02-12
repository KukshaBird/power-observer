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

  private static instance: Redis;
  private readonly client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.on('connect', () => console.log('Redis Client Connected'));
  }

  public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  private async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
    return this.client;
  }

  public async storeKey(key: string, value: string) {
    const client = await this.connect();
    await client.set(key, value);
  }

  public async getKey(key: string) {
    const client = await this.connect();
    return await client.get(key);
  }

  public async removeKey(key: string) {
    const client = await this.connect();
    await client.del(key);
  }
}

export default Redis;
