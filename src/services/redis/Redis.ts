import { createClient, type RedisClientType } from 'redis';

class Redis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
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
}

export default Redis;
