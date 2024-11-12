import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './products.entity';
import { Orders } from './orders.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: string;

  // order_id: Relación 1:1 con orders.
  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  //Relación N:N con products.
  @ManyToMany(() => Products, (products) => products.ordersDetails)
  products: Products[];
}
