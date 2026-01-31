import { describe, it, expect } from 'vitest';
import MessageGenerator from './MessageGenerator';
import { DurationObject } from '../../time/types';

describe('MessageGenerator', () => {
  const generator = new MessageGenerator();

  describe('blackoutString', () => {
    it('should format duration with days, hours, and minutes', () => {
      const duration: DurationObject = { days: 1, hours: 2, minutes: 30 };
      expect(generator.blackoutString(duration)).toBe('1 днів 2 годин 30 хвилин');
    });

    it('should format duration without days', () => {
      const duration: DurationObject = { days: 0, hours: 5, minutes: 15 };
      expect(generator.blackoutString(duration)).toBe('5 годин 15 хвилин');
    });

    it('should format duration with 0 hours and 0 minutes', () => {
      const duration: DurationObject = { days: 0, hours: 0, minutes: 0 };
      expect(generator.blackoutString(duration)).toBe('0 годин 0 хвилин');
    });
  });

  describe('connectMessage', () => {
    it('should generate connection message without blackout time', () => {
      const connectedTime = '21:30:00';
      const message = generator.connectMessage(connectedTime);

      expect(message).toContain(`Час: ${connectedTime}`);
    });

    it('should generate connection message with blackout time', () => {
      const connectedTime = '21:30:00';
      const blackoutTime = '2 годин 30 хвилин';
      const message = generator.connectMessage(connectedTime, blackoutTime);

      expect(message).toContain(`Час: ${connectedTime}`);
      expect(message).toContain(`Світла не було: ${blackoutTime}`);
    });
  });

  describe('disconnectMessage', () => {
    it('should generate disconnection message', () => {
      const disconnectedTime = '21:05:00';
      const message = generator.disconnectMessage(disconnectedTime);

      expect(message).toContain(`Час: ${disconnectedTime}`);
    });
  });
});
