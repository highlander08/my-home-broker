import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { OrderType } from './entities/order.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // Permite o frontend Next.js
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(
    client: any,
    payload: {
      assetId: string;
      walletId: string;
      type: OrderType;
      shares: number;
      price: number;
    },
  ) {
    const order = await this.ordersService.create({
      assetId: payload.assetId,
      walletId: payload.walletId,
      type: payload.type,
      shares: payload.shares,
      price: payload.price,
    });
    return order;
  }
}
// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Socket } from 'socket.io';
// import { OrdersService } from './orders.service';
// import { OrderType } from './entities/order.entity';

// @WebSocketGateway({ cors: { origin: '*' } }) // Certifique-se de permitir a origem correta em produção
// export class OrdersGateway {
//   constructor(private readonly ordersService: OrdersService) {}

//   @SubscribeMessage('orders/create')
//   async handleMessage(
//     @ConnectedSocket() client: Socket,
//     @MessageBody()
//     payload: {
//       assetId: string;
//       walletId: string;
//       type: OrderType;
//       shares: number;
//       price: number;
//     },
//   ): Promise<any> {
//     try {
//       // Validação simples (você pode usar Pipes ou DTOs para validação avançada)
//       if (
//         !payload.assetId ||
//         !payload.walletId ||
//         !payload.shares ||
//         !payload.price
//       ) {
//         throw new Error('Dados inválidos na criação da ordem.');
//       }

//       // Criação da ordem via serviço
//       const order = await this.ordersService.create({
//         assetId: payload.assetId,
//         walletId: payload.walletId,
//         type: payload.type,
//         shares: payload.shares,
//         price: payload.price,
//       });

//       // Confirmação de sucesso para o cliente
//       return order;
//     } catch (error) {
//       console.error('Erro ao criar ordem:', error.message);

//       // Retornar erro para o cliente (Socket.IO usa {error: 'mensagem'} para indicar erro)
//       return { error: 'Erro ao criar a ordem. Tente novamente.' };
//     }
//   }
// }
