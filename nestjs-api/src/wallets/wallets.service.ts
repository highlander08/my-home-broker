/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AssetPresenter } from 'src/assets/assets.presenter';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletAsset } from './entities/wallet-asset.entity ';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}
  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }
  // filtro de paginação
  findAll() {
    return this.walletSchema.find();
  }
  // lanaçamento de erross
  // refinamentos para a api
  // findOne(id: string) {
  //   return this.walletSchema.findById(id).populate([
  //     {
  //       path: 'assets',
  //       populate: ['asset'],
  //     },
  //   ]) as Promise<
  //     (Wallet & { assets: (WalletAsset & { asset: Asset })[] }) | null
  //   >;
  // }
  async findOne(id: string) {
    const wallet = await this.walletSchema.findById(id).populate([
      {
        path: 'assets',
        populate: ['asset'],
      },
    ]);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return {
      ...wallet.toObject(),
      assets: wallet.assets.map((walletAsset) => ({
        ...walletAsset.toObject(),
        asset: new AssetPresenter(walletAsset.asset).toJSON(),
      })),
    };
  }

  async createWalletAsset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const session = await this.connection.startSession();
    await session.startTransaction();
    try {
      const docs = await this.walletAssetSchema.create(
        [
          {
            wallet: data.walletId,
            asset: data.assetId,
            shares: data.shares,
          },
        ],
        {
          session,
        },
      );
      const walletAsset = docs[0];
      await this.walletSchema.updateOne(
        { _id: data.walletId },
        { $push: { assets: walletAsset._id } },
        { session },
      );
      await session.commitTransaction();
      return walletAsset;
      // session.endSession();
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
