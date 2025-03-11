/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-misused-promises */

// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { AssetDaily } from './entities/asset-daily.entity';
// import { Asset } from './entities/asset.entity';
// import { Observable } from 'rxjs';

// export class AssetDailiesService {
//   constructor(
//     @InjectModel(AssetDaily.name) private AssetDailySchema: Model<AssetDaily>,
//     @InjectModel(Asset.name) private assetSchema: Model<Asset>,
//   ) {}

//   async findAll(symbol: string) {
//     const asset = await this.assetSchema.findOne({ symbol });

//     // Verifica se o asset foi encontrado
//     if (!asset) {
//       throw new Error(`Asset with symbol ${symbol} not found`);
//     }

//     // Retorna a busca por AssetDaily com o _id do asset
//     return this.AssetDailySchema.find({ asset: asset._id }).sort({ date: 1 });
//   }

//   async create(dto: { symbol: string; date: Date; price: number }) {
//     const asset = await this.assetSchema.findOne({ symbol: dto.symbol });

//     // Verifica se o asset foi encontrado
//     if (!asset) {
//       throw new Error(`Asset with symbol ${dto.symbol} not found`);
//     }

//     // Cria o registro de AssetDaily
//     return this.AssetDailySchema.create({
//       asset: asset._id, // Correção da referência ao _id do asset
//       date: dto.date,
//       price: dto.price, // Correção do nome da propriedade de 'prince' para 'price'
//     });
//   }

//   subscribeCreatedEvents(): Observable<AssetDaily & { asset: Asset }> {
//     return new Observable((observer) => {
//       this.AssetDailySchema.watch(
//         [
//           {
//             $match: { operationType: 'insert' },
//           },
//         ],
//         { fullDocument: 'updateLookup' },
//       ).on('change', async (data: any) => {
//         try {
//           const assetDaily = await this.AssetDailySchema.findById(
//             data.fullDocument._id,
//           ).populate('asset');
//           if (assetDaily) {
//             observer.next(assetDaily as AssetDaily & { asset: Asset });
//           }
//         } catch (error) {
//           observer.error(error);
//         }
//       });
//     });
//   }
// }
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetDaily } from './entities/asset-daily.entity';
import { Asset } from './entities/asset.entity';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetDailiesService {
  constructor(
    @InjectModel(AssetDaily.name)
    private readonly assetDailySchema: Model<AssetDaily>,
    @InjectModel(Asset.name) private readonly assetSchema: Model<Asset>,
  ) {}
  async findAll(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });

    if (!asset) {
      throw new Error(`Asset with symbol ${symbol} not found`);
    }

    return this.assetDailySchema.find({ asset: asset!._id }).sort({ date: 1 });
  }

  async create(dto: { symbol: string; date: Date; price: number }) {
    const asset = await this.assetSchema.findOne({ symbol: dto.symbol });

    if (!asset) {
      throw new Error(`Asset with symbol ${dto.symbol} not found`);
    }

    return this.assetDailySchema.create({
      asset: asset._id,
      date: dto.date,
      price: dto.price,
    });
  }

  /**
   * Observa os eventos de criação de documentos na coleção AssetDaily.
   * Emite o registro criado para os assinantes.
   * @returns Um Observable para os eventos de criação.
   */
  subscribeCreatedEvents(): Observable<AssetDaily & { asset: Asset }> {
    return new Observable((observer) => {
      this.assetDailySchema
        .watch([{ $match: { operationType: 'insert' } }], {
          fullDocument: 'updateLookup',
        })
        .on('change', async (data: any) => {
          try {
            const assetDaily = await this.assetDailySchema
              .findById(data.fullDocument._id)
              .populate('asset');

            if (assetDaily) {
              observer.next(assetDaily! as AssetDaily & { asset: Asset });
            }
          } catch (error) {
            observer.error(error);
          }
        });
    });
  }
}
