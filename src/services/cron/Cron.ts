import { CronJob as CronTask } from 'cron';
import CheckDeviceStatusJob from './jobs/checkDeviceStatus';
import { CronJob } from './types';

class Cron {
  private static instance: Cron;
  private checkDeviceStatusJob: CronJob;

  private constructor() {
    this.checkDeviceStatusJob = new CheckDeviceStatusJob();
  }

  public static getInstance(): Cron {
    if (!Cron.instance) {
      Cron.instance = new Cron();
    }
    return Cron.instance;
  }

  public async start() {
    // Runs every minute: '0 * * * * *'
    const job = new CronTask('0 * * * * *', async () => {
      try {
        await this.checkDeviceStatusJob.start();
      } catch (error) {
        console.error('Error executing CheckDeviceStatusJob:', error);
      }
    });

    job.start();
    console.log('Cron jobs started');
  }
}

export default Cron;
