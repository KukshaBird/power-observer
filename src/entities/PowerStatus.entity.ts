import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum DeviceStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

@Entity({ name: 'power_status' })
class PowerStatus extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number;

  @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.DISCONNECTED })
  status: DeviceStatus;

  @Index()
  @Column({ type: 'varchar', length: 50, comment: '2026-03-03T22:15:00.028900028+02:00' })
  time: string;

  @Column({ type: 'boolean', default: true })
  trustable: boolean;

  @CreateDateColumn({ name: 'created_at', select: false, type: 'date', utc: true })
  createdAt: Date;
}

export default PowerStatus;
