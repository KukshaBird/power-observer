import express from 'express';
import Cron from './services/cron/Cron';

// Routes
import heartbeatRouter from './routes/heartbeat';

const app = express();

app.use('/heartbeat', heartbeatRouter);

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Server is running');

  // Initialize and start Cron
  const cron = Cron.getInstance();
  cron.start().catch(console.error);
});
