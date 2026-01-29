import express from 'express';
import Cron from './services/cron/Cron';

const { PORT, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

if (!PORT || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('Missing environment variables');
  process.exit(1);
}

// Routes
import heartbeatRouter from './routes/heartbeat';
import Bot from './services/bot/Bot';
import TelegramClient from './services/bot/clients/TelegramClient';

const app = express();

app.use('/heartbeat', heartbeatRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Server is running');

  // Initialize and start Cron
  const cron = Cron.getInstance();
  cron.start().catch(console.error);

  // Initialize and start Bot
  try {
    const botClient = new TelegramClient(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
    const bot = Bot.getInstance();
    bot.setMessengerClient(botClient);

    // test send a message
    bot.sendMessage('Application started').then(() => console.log('Message sent successfully'));
  } catch (error) {
    console.error('Bot initialization failed:', error);
  }
});
