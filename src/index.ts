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
import { AppDataSource } from './data-source';

const app = express();

app.use('/heartbeat', heartbeatRouter);

// Initialize database connection first
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(`Server is running. Listening on port ${PORT}`);

      // Initialize and start Cron
      const cron = Cron.getInstance();
      cron.start().catch(console.error);

      // Initialize and start Bot
      try {
        const botClient = new TelegramClient(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
        const bot = Bot.getInstance();
        bot.setMessengerClient(botClient);
      } catch (error) {
        console.error('Bot initialization failed:', error);
      }
    });
  })
  .catch((error) => console.error('Database connection failed:', error));
