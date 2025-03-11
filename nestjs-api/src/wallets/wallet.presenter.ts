import type { Asset } from 'src/assets/entities/asset.entity';
import type { Wallet } from './entities/wallet.entity';
import { AssetPresenter } from 'src/assets/assets.presenter';
import { WalletAsset } from './entities/wallet-asset.entity ';

export class WalletPresenter {
  constructor(
    private wallet: Wallet & { assets: (WalletAsset & { asset: Asset })[] },
  ) {}

  toJSON() {
    return {
      _id: this.wallet._id,
      assets: this.wallet.assets.map((walletAsset) => {
        const assetPresenter = new AssetPresenter(walletAsset.asset); // Corrigido `walletAsset.asset`
        return {
          asset: assetPresenter.toJSON(),
          shares: walletAsset.shares, // Corrigido para extrair `shares` corretamente
        };
      }),
    };
  }
}
