import { AssetsSync } from "@/components/AssetsSync";
import { WalletList } from "@/components/WalletList";
import { Wallet } from "@/models";
import { TableWalletAssetRow } from "@/TableWalletAssetRow";
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

export async function getMyWallet(walletId: string): Promise<Wallet | null> {
  try {
    const response = await fetch(`http://localhost:3000/wallets/${walletId}`);

    // Verificar se a resposta foi bem-sucedida (status 200)
    if (!response.ok) {
      throw new Error("Erro ao buscar a carteira");
    }

    const wallet = await response.json(); // Retornar o conteúdo da resposta como JSON
    return wallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export default async function MyWalletListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
//   // Agora aguardamos corretamente o valor de searchParams.
//   const wallet_id = await searchParams.wallet_id;

//   // Caso o wallet_id não esteja presente, renderiza o componente WalletList
//   if (!wallet_id) {
//     return <WalletList />;
//   }

//   // Chama a função para obter os dados da carteira
//   const wallet = await getMyWallet(wallet_id);

//   // Caso a carteira não seja encontrada, renderiza o WalletList
//   if (!wallet) {
//     return <WalletList />;
//   }

//   return (
//     <div className="flex flex-col space-y-5 flex-grow">
//       <article className="format">
//         <h1>Minha Carteira</h1>
//       </article>
//       <div className="overflow-x-auto w-full">
//         <Table className="w-full max-w-full table-fixed">
//           <TableHead>
//             <TableHeadCell>Ativo</TableHeadCell>
//             <TableHeadCell>Cotação</TableHeadCell>
//             <TableHeadCell>Quantidade</TableHeadCell>
//             <TableHeadCell>Comprar/Vender</TableHeadCell>
//           </TableHead>
//           <TableBody>
//             {wallet.assets.map((walletAsset, key) => {
//               return (
//                 <TableRow key={key}>
//                   <TableCell>
//                     <AssetShow asset={walletAsset.asset} />
//                   </TableCell>
//                   <TableCell>R$ {walletAsset.asset.price}</TableCell>
//                   <TableCell>{walletAsset.shares}</TableCell>
//                   <TableCell>
//                     <Button color="light" as={Link} href={`/assets/${walletAsset.asset.symbol}?wallet_id=${wallet_id}`}>Comprar/vender</Button>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
export default async function MyWalletListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
  const { wallet_id } = await searchParams; // Correção aqui!

  if (!wallet_id) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(wallet_id);

  if (!wallet) {
    return <WalletList />;
  }

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map((walletAsset, key) => (
              <TableWalletAssetRow walletAsset={walletAsset} walletId={wallet_id} key={key} />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync assetSymbols={wallet.assets.map((walletAsset) => walletAsset.asset.symbol)} />
    </div>
  );
}



