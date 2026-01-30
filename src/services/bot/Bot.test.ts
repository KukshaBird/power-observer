import { describe, it, expect, vi, beforeEach } from 'vitest';
import Bot from './Bot';
import { BotMessengerClient } from './clients/types';

describe('Bot', () => {
  beforeEach(() => {
    // Since Bot is a singleton with a private instance,
    // we need to reset it between tests if possible.
    // However, it's not easily accessible.
    // We can use type casting to reset it.
    (Bot as any).instance = undefined;
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = Bot.getInstance();
    const instance2 = Bot.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should throw error if sendMessage is called before messenger client is set', async () => {
    const bot = Bot.getInstance();
    await expect(bot.sendMessage('hello')).rejects.toThrow('Messenger client is not initialized');
  });

  it('should set messenger client and send message', async () => {
    const bot = Bot.getInstance();
    const mockClient: BotMessengerClient = {
      sendMessage: vi.fn().mockResolvedValue(undefined),
    };

    bot.setMessengerClient(mockClient);
    await bot.sendMessage('test message');

    expect(mockClient.sendMessage).toHaveBeenCalledWith('test message');
  });

  it('getMessengerClient should return the set client', () => {
    const bot = Bot.getInstance();
    const mockClient: BotMessengerClient = {
      sendMessage: vi.fn(),
    };

    bot.setMessengerClient(mockClient);

    // getMessengerClient is private, but we can test it indirectly via sendMessage
    // or by accessing it via any
    expect((bot as any).getMessengerClient()).toBe(mockClient);
  });
});
