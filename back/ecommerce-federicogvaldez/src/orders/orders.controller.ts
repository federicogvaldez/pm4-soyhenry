import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() data: CreateOrderDto) {
    return this.ordersService.addOrder(data);
  }
}
