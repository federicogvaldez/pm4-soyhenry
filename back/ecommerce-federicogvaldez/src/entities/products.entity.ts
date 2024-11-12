import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    default: 'url imagen',
  })
  imgUrl: string;

  //category_id  (Relación N:1)
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'categorie_id' })
  category: Categories;

  //Relación N:N con orderDetails
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  @JoinTable({
    name: 'products_order_details',
    joinColumn: { name: 'products_id' },
    inverseJoinColumn: { name: 'orderDetails_id' },
  })
  ordersDetails: OrderDetails[];
}
