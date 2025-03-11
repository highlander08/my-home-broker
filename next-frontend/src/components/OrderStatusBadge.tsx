import { OrderStatus } from '@/models';
import { Badge } from 'flowbite-react';
import React from 'react';

export const OrderStatusBadge = (props: { status: OrderStatus }) => {
  let color: string = 'gray'; // Definição de cor padrão
  let text: string = 'Desconhecido'; // Definição de texto padrão

  switch (props.status) {
    case OrderStatus.PENDING:
      color = 'info';
      text = 'Pendente';
      break;
    case OrderStatus.OPEN:
      color = 'warning';
      text = 'Aberto';
      break;
    case OrderStatus.CLOSED:
      color = 'success';
      text = 'Fechado';
      break;
    case OrderStatus.FAILED:
      color = 'failure';
      text = 'Falho';
      break;
    default:
      break;
  }

  return <Badge color={color} className="w-fit">{text}</Badge>;
};
