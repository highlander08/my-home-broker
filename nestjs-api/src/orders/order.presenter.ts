// import { AssetPresenter } from 'src/assets/assets.presenter';
// import { Asset } from 'src/assets/entities/asset.entity';
// import { Order } from './entities/order.entity';

// export class OrderPresenter {
//   constructor(private order: Order & { asset: Asset }) {} // Correção: `asset` no singular

//   toJSON() {
//     return {
//       _id: this.order._id,
//       asset: new AssetPresenter(this.order.asset).toJSON(), // `this.order.asset` corretamente referenciado
//       shares: this.order.shares,
//       partial: this.order.partial,
//       price: this.order.price,
//       type: this.order.type,
//       status: this.order.status,
//     };
//   }
// }
import { AssetPresenter } from 'src/assets/assets.presenter';
import { Asset } from 'src/assets/entities/asset.entity';
import { Order } from './entities/order.entity';

export class OrderPresenter {
  constructor(private order: Order & { asset: Asset }) {}

  toJSON() {
    return {
      _id: this.order._id,
      asset: new AssetPresenter(this.order.asset).toJSON(),
      shares: this.order.shares,
      partial: this.order.partial,
      price: this.order.asset.price, // Extrai o price do asset para fora
      // price: this.order.price, // Extrai o price do asset para fora
      type: this.order.type,
      status: this.order.status,
    };
  }
}
