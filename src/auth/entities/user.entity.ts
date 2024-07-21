import { Client } from '../../clients/entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCliente' })
  idCliente: Client;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  usuario: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  estado: boolean;
}
