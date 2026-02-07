/*
 * Class for generating messages for the client based on provided data.
 */
import { DurationObject } from '../../time/types';
import SMILES from './smiles.constant';

class MessageGenerator {
  public connectMessage(connectedTime: string, blackoutTime?: string): string {
    return `${SMILES.GREEN_DOT}Світло ПОВЕРНУЛОСЬ${SMILES.BULB}
Час: ${connectedTime}
${blackoutTime ? `${SMILES.TIMER}Світла не було: ${blackoutTime}` : ''}`;
  }

  public disconnectMessage(disconnectedTime: string): string {
    return `${SMILES.RED_DOT}Світло ВІДСУТНЄ${SMILES.PLUG}
Час: ${disconnectedTime}`;
  }

  public blackoutString(duration: DurationObject): string {
    return `${duration.days ? `${duration.days} днів ` : ''}${duration.hours} годин ${duration.minutes} хвилин`;
  }
}

export default MessageGenerator;
