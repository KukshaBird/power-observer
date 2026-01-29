export interface BotMessengerClient {
  sendMessage: (message: string) => Promise<void>;
}
