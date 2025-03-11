import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({
    description: 'The name of the asset',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The symbol of the asset (e.g., BTC for Bitcoin)',
    type: String,
  })
  symbol: string;

  @ApiProperty({
    description: 'The price of the asset',
    type: String,
  })
  price: string;

  @ApiProperty({
    description: 'The URL of the asset image',
    type: String,
  })
  image: string;
}
