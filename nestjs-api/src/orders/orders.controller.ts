import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPresenter } from './order.presenter';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiBody({
    description: 'Dados para criar um novo pedido',
    type: CreateOrderDto,
  })
  @ApiResponse({
    status: 201,
    description: 'O pedido foi criado com sucesso',
    type: CreateOrderDto, // Retorna um objeto do tipo OrderPresenter após a criação
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Recuperar todos os pedidos, opcionalmente filtrados por walletId',
  })
  @ApiQuery({
    name: 'walletId',
    required: false,
    description: 'Filtrar pedidos pelo walletId',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos',
    type: [CreateOrderDto], // Retorna uma lista de objetos do tipo OrderPresenter
  })
  async findAll(@Query('walletId') walletId: string) {
    const orders = await this.ordersService.findAll({ walletId });
    return orders.map((order) => new OrderPresenter(order));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar um pedido específico pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'O identificador único do pedido',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'O pedido solicitado',
    type: CreateOrderDto, // Retorna um objeto do tipo OrderPresenter
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
