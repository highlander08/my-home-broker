import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  // Aqui podemos adicionar uma descrição geral para a classe, se necessário
  @ApiProperty({
    description: 'The name of the asset (optional for update)',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The symbol of the asset (optional for update)',
    required: false,
  })
  symbol?: string;

  @ApiProperty({
    description: 'The price of the asset (optional for update)',
    required: false,
  })
  price?: string;

  @ApiProperty({
    description: 'The URL of the asset image (optional for update)',
    required: false,
  })
  image?: string;
}
