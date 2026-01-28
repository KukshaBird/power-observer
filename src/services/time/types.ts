export interface DateTimeLib {
  /** Returns the current time as an ISO string or timestamp */
  now(): string;

  diffMoreThenLimit(time1: string, time2: string, limit: number): boolean;
}
