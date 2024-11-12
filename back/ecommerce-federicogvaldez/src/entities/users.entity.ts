import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'integer',
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({ type: 'text' })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @ApiHideProperty()
  isAdmin: boolean;

  // orders_id: Relación 1:N con orders.
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
