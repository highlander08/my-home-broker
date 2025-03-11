import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetPresenter } from './assets.presenter';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo ativo' })
  @ApiBody({
    description: 'Dados necessários para criar um novo ativo',
    type: CreateAssetDto, // Definindo que o corpo da requisição é do tipo CreateAssetDto
  })
  @ApiResponse({ status: 201, description: 'Ativo criado com sucesso' })
  async create(@Body() createAssetDto: CreateAssetDto) {
    const asset = await this.assetsService.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os ativos' })
  @ApiResponse({ status: 200, description: 'Lista de ativos' })
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  @Get(':symbol')
  @ApiOperation({ summary: 'Buscar um ativo pelo símbolo' })
  @ApiParam({ name: 'symbol', description: 'Símbolo do ativo' })
  @ApiResponse({ status: 200, description: 'Ativo encontrado' })
  async findOne(@Param('symbol') symbol: string) {
    const asset = await this.assetsService.findOne(symbol);
    return new AssetPresenter(asset!);
  }
}
