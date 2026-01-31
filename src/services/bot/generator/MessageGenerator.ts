/*
 * Class for generating messages for the client based on provided data.
 */
import { DurationObject } from '../../time/types';

class MessageGenerator {
  public connectMessage(connectedTime: string, blackoutTime?: string): string {
    return `
      Світло ПОВЕРНУЛОСЬ
      Час: ${connectedTime}
      ${blackoutTime ? `Світла не було: ${blackoutTime}` : ''}
    `;
  }

  public disconnectMessage(disconnectedTime: string): string {
    return `
      Світло ВІДСУТНЄ
      Час: ${disconnectedTime}
    `;
  }

  public blackoutString(duration: DurationObject): string {
    return `${duration.days ? `${duration.days} днів ` : ''}${duration.hours} годин ${duration.minutes} хвилин`;
  }
}

export default MessageGenerator;
