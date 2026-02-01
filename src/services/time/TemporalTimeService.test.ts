import { describe, it, expect } from 'vitest';
import TemporalTimeService from './TemporalTimeService';

describe('TemporalTimeService', () => {
  const service = new TemporalTimeService();

  it('now should return a valid ISO string', () => {
    const now = service.now();
    expect(typeof now).toBe('string');
    // Basic ISO format check (contains T and Z or offset)
    expect(now).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  describe('diffMoreThenLimit', () => {
    it('should return true if diff is more than limit', () => {
      const time1 = '2026-01-31T20:00:00Z';
      const time2 = '2026-01-31T19:00:00Z';
      const limit = 30 * 60 * 1000; // 30 minutes
      expect(service.diffMoreThenLimit(time1, time2, limit)).toBe(true);
    });

    it('should return false if diff is less than limit', () => {
      const time1 = '2026-01-31T19:15:00Z';
      const time2 = '2026-01-31T19:00:00Z';
      const limit = 30 * 60 * 1000; // 30 minutes
      expect(service.diffMoreThenLimit(time1, time2, limit)).toBe(false);
    });
  });

  describe('subtract', () => {
    it('should return duration object between two times', () => {
      const time1 = '2026-01-31T21:30:00Z';
      const time2 = '2026-01-31T19:00:00Z';
      const diff = service.subtract(time1, time2);
      expect(diff).toEqual({
        days: 0,
        hours: 2,
        minutes: 30,
      });
    });

    it('should handle days in duration', () => {
      const time1 = '2026-02-02T19:00:00Z';
      const time2 = '2026-01-31T19:00:00Z';
      const diff = service.subtract(time1, time2);
      expect(diff).toEqual({
        days: 2,
        hours: 0,
        minutes: 0,
      });
    });
  });

  describe('formatTime', () => {
    it('should format ISO string to local time string with specified timezone', () => {
      // 19:00:00 UTC should be 21:00:00 in Europe/Kyiv (EET, UTC+2) in January
      const time = '2026-01-31T19:00:00Z';
      const formatted = service.formatTime(time);

      // If DEFAULT_TIME_ZONE is Europe/Kyiv, it should be 21:00:00 or 9:00:00 PM
      // Since we don't know for sure what the environment variable is during test,
      // but in this project it seems intended to be Europe/Kyiv.
      // If it's Europe/Kyiv, it must be 21 or 9.
      expect(formatted).toMatch(/(21|9):00:00/);
    });
  });
});
