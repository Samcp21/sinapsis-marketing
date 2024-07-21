import { User } from '../../auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  idCampania: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  nombre: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUsuario' })
  idUsuario: number;

  @Column({
    type: 'datetime',
  })
  fechaHoraProgramacion: Date;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  estado: boolean;
}
