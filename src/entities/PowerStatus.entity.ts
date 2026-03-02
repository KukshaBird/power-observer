import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'power_status' })
class PowerStatus extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  status: string;

  @Column()
  timestamp: Date;
}

export default PowerStatus;
