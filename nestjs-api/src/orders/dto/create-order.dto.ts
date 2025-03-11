/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { OrderType } from '../entities/order.entity'; // Assumindo que OrderType é uma enumeração

export class CreateOrderDto {
  @ApiProperty({
    description:
      'The unique identifier of the wallet that the order is associated with',
    example: '5f50c31b9d2402c7c9c6f6a8',
  })
  @IsString()
  walletId: string;

  @ApiProperty({
    description: 'The unique identifier of the asset being ordered',
    example: 'BTC',
  })
  @IsString()
  assetId: string;

  @ApiProperty({
    description: 'The price at which the asset is being ordered',
    example: 35000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The number of shares of the asset being ordered',
    example: 10,
  })
  @IsNumber()
  shares: number;

  @ApiProperty({
    description: 'The type of the order (buy/sell)',
    enum: OrderType,
    example: OrderType.BUY, // Se o OrderType for uma enumeração, podemos passar o valor de exemplo.
  })
  @IsEnum(OrderType)
  type: OrderType;
}
