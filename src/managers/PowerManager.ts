import PowerStatus, { DeviceStatus } from '../entities/PowerStatus.entity';

class PowerManager {
  private entity = PowerStatus;

  public async storeStatus(status: DeviceStatus, changeTime: string): Promise<PowerStatus | null> {
    const powerStatus = new this.entity();

    powerStatus.status = status;
    powerStatus.time = changeTime;

    try {
      return powerStatus.save();
    } catch (error: unknown) {
      console.log('Error saving power status: ', error);
      return null;
    }
  }
}

export default PowerManager;
