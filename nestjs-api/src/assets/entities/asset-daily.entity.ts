/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Asset } from './asset.entity';

export type AssetDailyDocument = HydratedDocument<AssetDaily>;

@Schema({ timestamps: true })
export class AssetDaily {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: Asset.name })
  asset: Asset | string;

  @Prop()
  date: Date;

  @Prop()
  price: number;
}

export const AssetDailySchema = SchemaFactory.createForClass(AssetDaily);
