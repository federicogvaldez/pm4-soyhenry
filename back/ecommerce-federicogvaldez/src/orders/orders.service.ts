import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRespository: OrdersRepository) {}

  getOrder(id: string) {
    return this.ordersRespository.getOrder(id);
  }

  addOrder(data: CreateOrderDto) {
    return this.ordersRespository.addOrder(data);
  }
}
