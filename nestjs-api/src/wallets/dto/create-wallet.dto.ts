// create-wallet-asset.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletAssetDto {
  @ApiProperty({
    description: 'The ID of the asset',
    type: String,
  })
  assetId: string;

  @ApiProperty({
    description: 'The number of shares for the asset',
    type: Number,
  })
  shares: number;
}
