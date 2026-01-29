import { BotMessengerClient } from './types';

class TelegramClient implements BotMessengerClient {
  constructor(
    private token: string,
    private chatId: string,
  ) {}

  async sendMessage(text: string) {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: this.chatId, text }),
    });
  }
}

export default TelegramClient;
