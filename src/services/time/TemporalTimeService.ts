import { DateTimeLib } from './types';
import { Temporal } from '@js-temporal/polyfill';

class TemporalTimeService implements DateTimeLib {
  now(): string {
    return Temporal.Now.instant().toString();
  }

  diffMoreThenLimit(time1: string, time2: string, limit: number): boolean {
    return Temporal.Instant.from(time1).epochMilliseconds - Temporal.Instant.from(time2).epochMilliseconds > limit;
  }
}

export default TemporalTimeService;
