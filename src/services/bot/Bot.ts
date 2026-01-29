import { BotMessengerClient } from './clients/types';

class Bot {
  private static instance: Bot;
  private messengerClient: BotMessengerClient | null = null;

  public static getInstance(): Bot {
    if (!Bot.instance) {
      console.log('Creating new Bot instance');
      Bot.instance = new Bot();
    }
    return Bot.instance;
  }

  public setMessengerClient(messengerClient: BotMessengerClient) {
    console.log('Setting messenger client');
    const thisBot = Bot.getInstance();
    thisBot.messengerClient = messengerClient;
  }

  public async sendMessage(message: string) {
    const messenger = this.getMessengerClient();
    console.log(message);
    await messenger.sendMessage(message);
  }

  private getMessengerClient(): BotMessengerClient {
    if (!this.messengerClient) {
      throw new Error('Messenger client is not initialized');
    }
    return this.messengerClient;
  }
}

export default Bot;
