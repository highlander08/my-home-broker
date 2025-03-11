import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateWalletAssetDto } from './dto/create-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova carteira' })
  @ApiBody({
    description: 'Dados para criar uma nova carteira',
    type: CreateWalletAssetDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A carteira foi criada com sucesso',
  })
  create(@Body() createWalletDto: CreateWalletAssetDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as carteiras' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas as carteiras',
    type: [CreateWalletAssetDto], // Assumindo que CreateWalletDto é uma representação simplificada da carteira
  })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar uma carteira específica pelo seu ID' })
  @ApiParam({
    name: 'id',
    description: 'O identificador único da carteira',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'A carteira solicitada',
    type: CreateWalletAssetDto, // Assumindo que CreateWalletDto é uma representação simplificada da carteira
  })
  @ApiResponse({
    status: 404,
    description: 'Carteira não encontrada',
  })
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada');
    }
    return wallet;
  }

  @Post(':id/assets')
  @ApiOperation({ summary: 'Adicionar um ativo a uma carteira' })
  @ApiParam({
    name: 'id',
    description:
      'O identificador único da carteira à qual o ativo será adicionado',
    type: String,
  })
  @ApiBody({
    description: 'Dados para criar um novo ativo na carteira',
    type: CreateWalletAssetDto, // Usando o DTO corretamente aqui
  })
  @ApiResponse({
    status: 201,
    description: 'O ativo foi adicionado com sucesso à carteira',
  })
  createWalletAsset(
    @Param('id') id: string,
    @Body() body: { assetId: string; shares: number },
  ) {
    return this.walletsService.createWalletAsset({
      walletId: id,
      assetId: body.assetId,
      shares: body.shares,
    });
  }
}
