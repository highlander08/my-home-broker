import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderType } from '../entities/order.entity'; // Importe a enum OrderType

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description:
      'The unique identifier of the wallet that the order is associated with',
    example: '5f50c31b9d2402c7c9c6f6a8',
    required: false,
  })
  walletId?: string;

  @ApiProperty({
    description: 'The unique identifier of the asset being ordered',
    example: 'BTC',
    required: false,
  })
  assetId?: string;

  @ApiProperty({
    description: 'The price at which the asset is being ordered',
    example: 35000,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'The number of shares of the asset being ordered',
    example: 10,
    required: false,
  })
  shares?: number;

  @ApiProperty({
    description: 'The type of the order (buy/sell)',
    enum: OrderType, // Use OrderType enum diretamente aqui
    example: OrderType.BUY, // Altere conforme os valores da enum OrderType
    required: false,
  })
  type?: OrderType; // Defina como OrderType, não como string
}
