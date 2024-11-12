import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './products.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  //Relación: 1:N con products.
  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
