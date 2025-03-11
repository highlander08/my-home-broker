/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// import {
//   WebSocketGateway,
//   OnGatewayInit,
//   SubscribeMessage,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { AssetsService } from './assets.service';
// import { Logger } from '@nestjs/common';
// import { AssetPresenter } from './assets.presenter';
// import type { AssetDailiesService } from './asset-dailies.service';
// import { AssetDailyPresenter } from './asset-daily.presenter';

// @WebSocketGateway({
//   cors: {
//     origin: 'http://localhost:3001', // Permite o frontend Next.js
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   },
// })
// export class AssetsGateway implements OnGatewayInit {
//   logger = new Logger(AssetsGateway.name);
//   constructor(
//     private assetsService: AssetsService,
//     private assetsDailiesService: AssetDailiesService,
//   ) {}

//   afterInit(server: Server) {
//     this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
//       server
//         .to(asset.symbol)
//         .emit('assets/price-changed', new AssetPresenter(asset).toJSON());
//     });
//     this.assetsDailiesService
//       .subscribeCreatedEvents()
//       .subscribe((assetDaily) => {
//         server
//           .to(assetDaily.asset.symbol)
//           .emit(
//             'assets/daily-created',
//             new AssetDailyPresenter(assetDaily).toJSON(),
//           );
//       });
//   }
//   @SubscribeMessage('joinAssets')
//   handleJoinAssets(client: any, payload: { symbols: string[] }) {
//     if (!payload.symbols?.length) {
//       return;
//     }
//     payload.symbols.forEach((symbol) => {
//       client.join(symbol);
//     });
//     this.logger.log(
//       `Client ${client.id} joined  asset: ${payload.symbols.join(', ')}`,
//     );
//   }

//   @SubscribeMessage('JoinAsset')
//   handleJoinAsset(client: any, payload: { symbol: string }) {
//     client.join(payload.symbol);
//     this.logger.log(`Client ${client.id} joined  asset: ${payload.symbol}`);
//   }
//   @SubscribeMessage('leaveAssets')
//   handleLeaveAssets(client: any, payload: { symbols: string[] }) {
//     if (!payload.symbols?.length) {
//       return;
//     }
//     payload.symbols.forEach((symbol) => {
//       client.leave(symbol);
//     });
//     this.logger.log(
//       `Client ${client.id} left  assets: ${payload.symbols.join(', ')}`,
//     );
//   }

//   @SubscribeMessage('leaveAsset')
//   handleLeaveAsset(client: any, payload: { symbol: string }) {
//     client.leave(payload.symbol);
//     this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
//   }
// }
import {
  WebSocketGateway,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetPresenter } from './assets.presenter';
import { AssetDailyPresenter } from './asset-daily.presenter';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Permite o frontend Next.js
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class AssetsGateway implements OnGatewayInit {
  private logger = new Logger(AssetsGateway.name);

  constructor(
    private readonly assetsService: AssetsService,
    private readonly assetsDailiesService: AssetDailiesService,
  ) {}

  // afterInit(server: Server) {
  //   this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
  //     server
  //       .to(asset.symbol)
  //       .emit('assets/price-changed', new AssetPresenter(asset).toJSON());
  //   });

  //   this.assetsDailiesService
  //     .subscribeCreatedEvents()
  //     .subscribe((assetDaily) => {
  //       server
  //         .to(assetDaily.asset.symbol)
  //         .emit(
  //           'assets/daily-created',
  //           new AssetDailyPresenter(assetDaily).toJSON(),
  //         );
  //     });
  // }
  afterInit(server: Server) {
    this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
      if (!asset || !asset.symbol) {
        this.logger.warn('Received invalid asset data');
        return;
      }
      server
        .to(asset.symbol)
        .emit('assets/price-changed', new AssetPresenter(asset).toJSON());
    });

    this.assetsDailiesService
      .subscribeCreatedEvents()
      .subscribe((assetDaily) => {
        if (!assetDaily || !assetDaily.asset || !assetDaily.asset.symbol) {
          this.logger.warn('Received invalid asset daily data');
          return;
        }
        server
          .to(assetDaily.asset.symbol)
          .emit(
            'assets/daily-created',
            new AssetDailyPresenter(assetDaily).toJSON(),
          );
      });
  }

  // @SubscribeMessage('joinAssets')
  // handleJoinAssets(
  //   client: Socket,
  //   @MessageBody() payload: { symbols: string[] },
  // ) {
  //   if (!payload.symbols?.length) {
  //     return;
  //   }
  //   payload.symbols.forEach((symbol) => {
  //     client.join(symbol);
  //   });
  //   this.logger.log(
  //     `Client ${client.id} joined assets: ${payload.symbols.join(', ')}`,
  //   );
  // }

  // @SubscribeMessage('joinAsset')
  // handleJoinAsset(client: Socket, @MessageBody() payload: { symbol: string }) {
  //   client.join(payload.symbol);
  //   this.logger.log(`Client ${client.id} joined asset: ${payload.symbol}`);
  // }

  // @SubscribeMessage('leaveAssets')
  // handleLeaveAssets(
  //   client: Socket,
  //   @MessageBody() payload: { symbols: string[] },
  // ) {
  //   if (!payload.symbols?.length) {
  //     return;
  //   }
  //   payload.symbols.forEach((symbol) => {
  //     client.leave(symbol);
  //   });
  //   this.logger.log(
  //     `Client ${client.id} left assets: ${payload.symbols.join(', ')}`,
  //   );
  // }

  // @SubscribeMessage('leaveAsset')
  // handleLeaveAsset(client: Socket, @MessageBody() payload: { symbol: string }) {
  //   client.leave(payload.symbol);
  //   this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
  // }
  @SubscribeMessage('joinAssets')
  handleJoinAssets(
    client: Socket,
    @MessageBody() payload: { symbols: string[] },
  ) {
    try {
      if (
        !client ||
        !Array.isArray(payload.symbols) ||
        payload.symbols.length === 0
      ) {
        this.logger.warn(
          `Client ${client?.id || 'unknown'} sent invalid data: ${JSON.stringify(payload)}`,
        );
        return;
      }

      payload.symbols.forEach((symbol) => {
        if (typeof symbol === 'string') {
          client.join(symbol);
          this.logger.log(`Client ${client.id} joined asset: ${symbol}`);
        } else {
          this.logger.warn(`Invalid symbol received: ${symbol}`);
        }
      });
    } catch (error) {
      this.logger.error(
        `Error handling 'joinAssets' for client ${client?.id}: ${error.message}`,
      );
    }
  }

  @SubscribeMessage('joinAsset')
  handleJoinAsset(client: Socket, @MessageBody() payload: { symbol: string }) {
    try {
      if (!client || typeof payload.symbol !== 'string') {
        this.logger.warn(
          `Client ${client?.id || 'unknown'} sent invalid symbol: ${JSON.stringify(payload)}`,
        );
        return;
      }

      client.join(payload.symbol);
      this.logger.log(`Client ${client.id} joined asset: ${payload.symbol}`);
    } catch (error) {
      this.logger.error(
        `Error handling 'joinAsset' for client ${client?.id}: ${error.message}`,
      );
    }
  }

  @SubscribeMessage('leaveAssets')
  handleLeaveAssets(
    client: Socket,
    @MessageBody() payload: { symbols: string[] },
  ) {
    try {
      if (
        !client ||
        !Array.isArray(payload.symbols) ||
        payload.symbols.length === 0
      ) {
        this.logger.warn(
          `Client ${client?.id || 'unknown'} sent invalid data: ${JSON.stringify(payload)}`,
        );
        return;
      }

      payload.symbols.forEach((symbol) => {
        if (typeof symbol === 'string') {
          client.leave(symbol);
          this.logger.log(`Client ${client.id} left asset: ${symbol}`);
        } else {
          this.logger.warn(`Invalid symbol received: ${symbol}`);
        }
      });
    } catch (error) {
      this.logger.error(
        `Error handling 'leaveAssets' for client ${client?.id}: ${error.message}`,
      );
    }
  }

  @SubscribeMessage('leaveAsset')
  handleLeaveAsset(client: Socket, @MessageBody() payload: { symbol: string }) {
    try {
      if (!client || typeof payload.symbol !== 'string') {
        this.logger.warn(
          `Client ${client?.id || 'unknown'} sent invalid symbol: ${JSON.stringify(payload)}`,
        );
        return;
      }

      client.leave(payload.symbol);
      this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
    } catch (error) {
      this.logger.error(
        `Error handling 'leaveAsset' for client ${client?.id}: ${error.message}`,
      );
    }
  }
}
