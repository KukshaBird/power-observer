/*
 * Class for generating messages for the client based on provided data.
 */
import { DurationObject } from '../../time/types';

class MessageGenerator {
  public connectMessage(lastHeartbeatTime: string, connectedTime: string, blackoutTime?: string): string {
    return `
      Світло ПОВЕРНУЛОСЬ
      Час: ${connectedTime}
      Останній раз фіксувалос: ${lastHeartbeatTime}
      ${blackoutTime ? `Світла не було: ${blackoutTime}` : ''}
    `;
  }

  public disconnectMessage(lastHeartbeatTime: string, disconnectedTime: string): string {
    return `
      Світло ВИКЛЮЧЕНО
      Час: ${disconnectedTime}
      Останній раз фіксувалос: ${lastHeartbeatTime}
    `;
  }

  public blackoutString(duration: DurationObject): string {
    return `${duration.days ? `${duration.days} днів ` : ''}${duration.hours} годин ${duration.minutes} хвилин`;
  }
}

export default MessageGenerator;
