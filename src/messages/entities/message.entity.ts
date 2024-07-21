import { Campaign } from '../../campaigns/entities/campaign.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  idMensaje: number;

  @ManyToOne(() => Campaign, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCampania' })
  idCampania: number;

  @Column({
    type: 'int',
    default: 1,
  })
  estadoEnvio: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  fechaHoraEnvio: Date | null;

  @Column({
    type: 'varchar',
    length: 160,
  })
  mensaje: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  estado: boolean;
}
