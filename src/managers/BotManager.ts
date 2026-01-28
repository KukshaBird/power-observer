import Bot from '../services/bot/Bot';
import Redis from '../services/redis/Redis';

class BotManager {
  private bot: Bot;
  private bank: Redis;

  constructor() {
    this.bot = new Bot();
    this.bank = new Redis();
  }

  public async sendMessage() {
    await this.bot.sendMessage();
  }

  public async handleHeartbeat() {
    const now = new Date();
    const lastHeartbeat = now.getTime(); // Get last heartbeat from Redis
    // if the last heartbeat is more than 1 minutes ago, send a message
    // else set the last heartbeat now
  }
}

export default BotManager;
