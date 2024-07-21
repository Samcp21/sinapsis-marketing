import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  nombre: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  estado: boolean;
}
