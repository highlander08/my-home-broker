import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  timestamps: true,
  collectionOptions: {
    changeStreamPreAndPostImages: {
      enabled: true,
    },
  },
})
export class Asset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;
  @Prop({ unique: true, index: true })
  name: string;
  @Prop({ unique: true, index: true })
  symbol: string;
  @Prop()
  image: string;
  @Prop()
  price: number;
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
