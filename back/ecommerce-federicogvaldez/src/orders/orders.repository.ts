import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Products } from 'src/entities/products.entity';
import { CreateOrderDto } from './orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getOrder(id: string) {
    //BUSCAR ORDEN POR ID
    //DEVOLVER ORDER, ORDER_DETAIL Y PRODUCTS
    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });
  }

  async addOrder(data: CreateOrderDto) {
    // BUSCAR USER POR ID Y CREAR REGISTRO EN TABLA ORDERS
    const user = await this.usersRepository.findOneBy({ id: data.userId });
    if (!user) {
      throw new NotFoundException(`User with id ${data.userId} not found`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    // BUSCAR TODOS LOS PRODUCTS POR ID, ACT TOTAL COMPRA, REDUCIR STOCK
    let total = 0;

    const products = await Promise.all(
      data.products.map(async (el) => {
        const product = await this.productsRepository.findOneBy({ id: el.id });
        total += Number(product.price);
        await this.productsRepository.update(
          { id: el.id },
          { stock: product.stock - 1 },
        );
        return await this.productsRepository.findOneBy({ id: el.id });
      }),
    );

    //CONSTRUIR Y CREAR DETALLE DE COMPRA CON PRODUCTOS SELECCIONADOS
    const orderDetail = new OrderDetails();
    (orderDetail.price = total.toString()),
      (orderDetail.order = newOrder),
      (orderDetail.products = products);

    await this.orderDetailsRepository.save(orderDetail);

    //RETORNAR ORDEN DE COMPRA CON PRECIO Y ID DETALLE COMPRA
    const purchaseOrder = await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetail: true },
    });

    return purchaseOrder;
  }
}
