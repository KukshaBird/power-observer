import { createClient, type RedisClientType } from 'redis';

class Redis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
  }

  public async storeKey(key: string, value: string) {
    await this.client.set(key, value);
  }

  public async getKey(key: string) {
    return await this.client.get(key);
  }
}

export default Redis;
