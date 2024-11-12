import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  date: Date;

  //Relación 1:1 con orderDetails.
  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetails;

  //user_id:  (Relación N:1) con users.
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
