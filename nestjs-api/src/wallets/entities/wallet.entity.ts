import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { WalletAsset, type WalletAssetDocument } from './wallet-asset.entity ';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v) => [...new Set(v)],
    ref: WalletAsset.name,
  })
  assets: WalletAssetDocument[] | string[];
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
