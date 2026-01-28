export interface CronJob {
  start(): Promise<void>;
}
