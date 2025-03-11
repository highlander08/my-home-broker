/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}
  create(createAssetDto: CreateAssetDto) {
    return this.assetSchema.create(createAssetDto);
  }
  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    return this.assetSchema.findOne({ symbol });
  }

  subscribeNewPriceChangedEvents(): Observable<Asset> {
    return new Observable((observer) => {
      this.assetSchema
        .watch(
          [
            {
              $match: {
                $or: [
                  { operationType: 'update' },
                  { operationType: 'replace' },
                ],
              },
            },
          ],
          {
            fullDocument: 'updateLookup',
            fullDocumentBeforeChange: 'whenAvailable',
          },
        )
        .on('change', async (data) => {
          if (
            data.fullDocument.price === data.fullDocumentBeforeChange?.price
          ) {
            return;
          }
          try {
            const asset = await this.assetSchema.findById(
              data.fullDocument._id,
            );
            if (asset) {
              observer.next(asset!);
            }
          } catch (error) {
            observer.error(error);
          }
        });
    });
  }
}
