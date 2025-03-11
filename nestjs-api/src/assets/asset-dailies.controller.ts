import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetDailiesService } from './asset-dailies.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateAssetDto } from './dto/create-asset.dto';

@Controller('assets/:symbol/dailies')
export class AssetsDailiesController {
  constructor(private assetsDailiesService: AssetDailiesService) {}

  @Get()
  @ApiOperation({
    summary:
      'Recuperar todos os dados diários de ativos para um símbolo específico',
  })
  @ApiParam({ name: 'symbol', description: 'O símbolo do ativo' })
  @ApiResponse({
    status: 200,
    description: 'A lista de dados diários do ativo',
    type: CreateAssetDto, // Você pode criar um DTO específico para o retorno aqui
  })
  findAll(@Param('symbol') symbol: string) {
    return this.assetsDailiesService.findAll(symbol);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar dados diários de ativos para um símbolo específico',
  })
  @ApiParam({ name: 'symbol', description: 'O símbolo do ativo' })
  @ApiBody({
    description: 'Dados para criar uma nova entrada de dados diários de ativo',
    type: CreateAssetDto, // Crie um DTO para esse corpo, como CreateAssetDailyDto
    examples: {
      example1: {
        value: {
          date: '2025-03-11',
          price: 123.45,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Os dados diários do ativo foram criados com sucesso',
    type: CreateAssetDto, // Se possível, crie um DTO para o retorno também
  })
  create(
    @Body() dto: { date: string; price: number },
    @Param('symbol') symbol: string,
  ) {
    // Passando corretamente o date como Date e price como número
    return this.assetsDailiesService.create({
      symbol,
      date: new Date(dto.date),
      price: dto.price,
    });
  }
}
