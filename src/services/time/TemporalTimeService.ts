import { DateTimeLib, DurationObject } from './types';
import { Temporal } from '@js-temporal/polyfill';

const DEFAULT_TIME_ZONE = process.env.API_TIMEZONE || 'UTC';

class TemporalTimeService implements DateTimeLib {
  constructor() {
    console.log('TemporalTimeService initialized with default timezone: ', DEFAULT_TIME_ZONE);
  }
  now(): string {
    return Temporal.Now.instant().toString({ timeZone: DEFAULT_TIME_ZONE });
  }

  diffMoreThenLimit(time1: string, time2: string, limit: number): boolean {
    return Temporal.Instant.from(time1).epochMilliseconds - Temporal.Instant.from(time2).epochMilliseconds > limit;
  }

  subtract(time1: string, time2: string): DurationObject {
    const instant1 = Temporal.Instant.from(time1);
    const instant2 = Temporal.Instant.from(time2);
    // in reverse order to get a positive duration
    const duration = instant1.since(instant2).round({ smallestUnit: 'minutes', largestUnit: 'days' });
    return {
      days: duration.days,
      hours: duration.hours,
      minutes: duration.minutes,
    };
  }

  formatTime(time: string): string {
    return Temporal.Instant.from(time).toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: DEFAULT_TIME_ZONE,
      hour12: false,
    });
  }
}

export default TemporalTimeService;
