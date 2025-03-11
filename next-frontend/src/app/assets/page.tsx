 
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @next/next/no-img-element */
// import { Wallet, type Asset } from "@/models";
// import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

// export async function getAssets(): Promise<Asset> {
//   const response = await fetch(`http://localhost:3000/assets`);

//   // Verificar se a resposta foi bem-sucedida (status 200)
//   if (!response.ok) {
//     throw new Error(`Erro ao buscar a carteira: ${response.statusText}`);
//   }

//   const wallet = await response.json(); // Retornar o conteúdo da resposta como JSON
//   return wallet;
// }

// export default async function AssetsListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
//   const { wallet_id } = searchParams;  // Corrigido: não precisa de await

//   try {
//     const assets = await getAssets();

//     return (
//       <div className="flex flex-col space-y-5 flex-grow">
//         <article className="format">
//           <h1>Ativos</h1>
//         </article>
//         <div className="overflow-x-auto w-full">
//           <Table className="w-full max-w-full table-fixed">
//             <TableHead>
//               <TableHeadCell>Ativo</TableHeadCell>
//               <TableHeadCell>Cotação</TableHeadCell>
//               <TableHeadCell>Comprar/Vender</TableHeadCell>
//             </TableHead>
//             <TableBody>
//               {assets.map((asset, key) => {
//                 console.log('oi', asset);

//                 return (
//                   <TableRow key={key}>
//                     <TableCell>
//                       <div className="flex space-x-1">
//                         <div className="content-center">
//                           <img 
//                             src={asset?.image_url}
//                             alt={asset?.symbol} 
//                             width={30} 
//                             height={30} 
//                           />
//                         </div>
//                         <div className="flex flex-col text-sm">
//                           <span>{asset.name}</span>
//                           <span>{asset.symbol}</span>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>R$ {asset.price}</TableCell>
//                     <TableCell>
//                       <Button color="light">Comprar/vender</Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     );
//   } catch (error: unknown) {
//     // Verifique se o erro é uma instância de Error
//     if (error instanceof Error) {
//       return (
//         <div className="flex flex-col space-y-5 flex-grow">
//           <h1>Erro ao carregar a carteira</h1>
//           <p>{error.message}</p>
//         </div>
//       );
//     } else {
//       // Caso o erro não seja uma instância de Error
//       return (
//         <div className="flex flex-col space-y-5 flex-grow">
//           <h1>Erro desconhecido</h1>
//         </div>
//       );
//     }
//   }
// }

// 2
// import { AssetsSync } from "@/components/AssetsSync";
// import { WalletList } from "@/components/WalletList";
// import { Asset } from "@/models";
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
// import { getMyWallet } from "../page";
// import { TableAssetRow } from "./TableAssetRow";

// export async function getAssets(): Promise<Asset[]> {
//   const response = await fetch(`http://localhost:3000/assets`);

//   if (!response.ok) {
//     throw new Error(`Erro ao buscar os ativos: ${response.statusText}`);
//   }

//   const assets: Asset[] = await response.json();
//   return assets;
// }

// export default async function AssetsListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
//   try {

//     const { wallet_id } = await searchParams;  // Corrigido: não precisa de await

//     if (!wallet_id) {
//       return <WalletList />
//     }

//     const wallet = await getMyWallet(wallet_id);

//     if (!wallet) {
//       return <WalletList />
//     }
//     const assets = await getAssets();

//     if (!Array.isArray(assets)) {
//       throw new Error("Dados inválidos recebidos da API.");
//     }

//     return (
//       <div className="flex flex-col space-y-5 flex-grow">
//         <article className="format">
//           <h1>Ativos</h1>
//         </article>
//         <div className="overflow-x-auto w-full">
//           <Table className="w-full max-w-full table-fixed">
//             <TableHead>
//               <TableHeadCell>Ativo</TableHeadCell>
//               <TableHeadCell>Cotação</TableHeadCell>
//               <TableHeadCell>Comprar/Vender</TableHeadCell>
//             </TableHead>
//             <TableBody>
//               {assets.length > 0 ? (
//                 assets.map((asset) => (
//                   <TableAssetRow key={asset.symbol} asset={asset} walletId={wallet_id} />
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center">
//                     Nenhum ativo disponível.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <AssetsSync assetSymbols={assets.map((asset) => asset.symbol)} />
//       </div>
//     );
//   } catch (error: unknown) {
//     console.error("Erro ao carregar ativos:", error);

//     return (
//       <div className="flex flex-col space-y-5 flex-grow">
//         <h1>Erro ao carregar os ativos</h1>
//         <p>{error instanceof Error ? error.message : "Erro desconhecido"}</p>
//       </div>
//     );
//   }
// }

import { AssetsSync } from "@/components/AssetsSync";
import { WalletList } from "@/components/WalletList";
import { Asset } from "@/models";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { getMyWallet } from "../page";
import { TableAssetRow } from "./TableAssetRow";

export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`http://localhost:3000/assets`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os ativos: ${response.statusText}`);
  }

  const assets: Asset[] = await response.json();
  return assets;
}

export default async function AssetsListPage({ searchParams }: { searchParams: { wallet_id: string } }) {
  try {
    const { wallet_id } = await searchParams;  // Corrigido: não precisa de await

    if (!wallet_id) {
      return <WalletList />;
    }

    const wallet = await getMyWallet(wallet_id);

    if (!wallet) {
      return <WalletList />;
    }

    const assets = await getAssets();

    if (!Array.isArray(assets)) {
      throw new Error("Dados inválidos recebidos da API.");
    }

    // Utilizando a store para monitorar a atualização dos ativos
    // const changeAsset = useAssetStore((state) => state.changeAsset);

    return (
      <div className="flex flex-col space-y-5 flex-grow">
        <article className="format">
          <h1>Ativos</h1>
        </article>
        <div className="overflow-x-auto w-full">
          <Table className="w-full max-w-full table-fixed">
            <TableHead>
              <TableHeadCell>Ativo</TableHeadCell>
              <TableHeadCell>Cotação</TableHeadCell>
              <TableHeadCell>Comprar/Vender</TableHeadCell>
            </TableHead>
            <TableBody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <TableAssetRow key={asset.symbol} asset={asset} walletId={wallet_id} />
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
        <AssetsSync assetSymbols={assets.map((asset) => asset.symbol)} />
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
