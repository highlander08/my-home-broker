import AssetShow from "@/components/AssetShow";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import OrderTypeBadge from "@/components/OrderTypeBadge";
import { WalletList } from "@/components/WalletList";
import { Order } from "@/models";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { getMyWallet } from "../page";

export async function getOrders(walletId: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:3000/orders?walletId=${walletId}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os ativos: ${response.statusText}`);
  }

  const orders: Order[] = await response.json();
  return orders;
}

export default async function OrdersListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
  try {
    const { wallet_id } = await searchParams;


    if (!wallet_id) {
      return <WalletList />
    }

    const wallet = await getMyWallet(wallet_id);

    if (!wallet) {
      return <WalletList />
    }
    const orders = await getOrders(wallet_id);

    if (!Array.isArray(orders)) {
      throw new Error("Dados inválidos recebidos da API.");
    }

    return (
      <div className="flex flex-col space-y-5 flex-grow">
        <article className="format">
          <h1>Minhas Ordens</h1>
        </article>
        <div className="overflow-x-auto w-full">
          <Table className="w-full max-w-full table-fixed">
            <TableHead>
              <TableHeadCell>Ativo</TableHeadCell>
              <TableHeadCell>Preço</TableHeadCell>
              <TableHeadCell>Quantidade</TableHeadCell>
              <TableHeadCell>Tipo</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <AssetShow asset={order.asset} />
                    </TableCell>
                    <TableCell>R$ {order.price}</TableCell>
                    <TableCell>R$ {order.shares}</TableCell>
                    <TableCell>
                      <OrderTypeBadge type={order.type} />
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <Button color="light">Comprar/Vender</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum ativo disponível.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error("Erro ao carregar ativos:", error);

    return (
      <div className="flex flex-col space-y-5 flex-grow">
        <h1>Erro ao carregar os ativos</h1>
        <p>{error instanceof Error ? error.message : "Erro desconhecido"}</p>
      </div>
    );
  }
}

