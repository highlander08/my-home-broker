
import { getMyWallet } from "@/app/page";
import AssetShow from "@/components/AssetShow";
import { OrderForm } from "@/components/OrderForm";
import { TabsItem } from "@/components/Tabs";
import { WalletList } from "@/components/WalletList";
import { Asset, OrderType, type AssetDaily } from "@/models";
import { Card, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./AssetChartComponent";
import { Time } from "lightweight-charts";

export async function getAsset(symbol: string): Promise<Asset> {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`)
  return response.json();
}
// export default async function AssetDashboard({
//   params,
//   searchParams,
// }: { params: Promise<{ assetSymbol: string }>; searchParams: Promise<{ wallet_id: string }> }) {
//   const { assetSymbol } = await params;
//   const { wallet_id } = await searchParams;

//   const asset = await getAsset(assetSymbol);

//   return (
//     <div className="flex flex-col space-y-4 flex-grow">
//       {/* Exibição do ativo */}
//       <div className="flex flex-col space-y-4">
//         <AssetShow asset={asset} />
//         <div className="ml-2 mt-2 font-bold text-2xl">R$ {asset.price}</div>
//       </div>

//       {/* Área do Formulário e Layout */}
//       <div className="grid grid-cols-5 gap-4 flex-grow">
//         {/* Seção do Formulário */}
//         <div className="col-span-2">
//           <Card>
//             <Tabs>
//               <TabsItem active title={<div className="text-blue-700">Comprar</div>}>
//                 <OrderForm asset={asset} wallet_id={wallet_id} type={OrderType.BUY} />
//               </TabsItem>
//               <TabsItem title={<div className="text-red-700">Vender</div>}>
//                 <OrderForm asset={asset} wallet_id={wallet_id} type={OrderType.SELL} />
//               </TabsItem>
//             </Tabs>
//           </Card>
//         </div>

//         {/* Espaço vazio para ajustar layout */}
//         <div className="col-span-3 flex flex-grow"></div>
//       </div>
//     </div>
//   );
// }

export async function getAssetDailies(assetSymbol: string): Promise<AssetDaily[]> {
  const response = await fetch(`http://localhost:3000/assets/${assetSymbol}/dailies`);
  return await response.json();
}

export default async function AssetDashboard({
  params,
  searchParams,
}: { params: Promise<{ assetSymbol: string }>; searchParams: Promise<{ wallet_id: string }> }) {
  const { assetSymbol } = await params;
  const { wallet_id } = await searchParams;

  if (!wallet_id) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(wallet_id);

  if (!wallet) {
    return <WalletList />;
  }

  const asset = await getAsset(assetSymbol);
  const assetDailies = await getAssetDailies(assetSymbol);

  // Verifica se assetDailies é um array e contém dados
  // if (!Array.isArray(assetDailies) || assetDailies.length === 0) {
  //   return <div>Dados de ativos diários não encontrados.</div>;
  // }

  const chartData = assetDailies.map((assetDaily) => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: assetDaily.price,
  }));

  return (
    <div className="flex flex-col space-y-4 flex-grow">
      {/* Exibição do ativo */}
      <div className="flex flex-col space-y-4">
        <AssetShow asset={asset} />
        <div className="ml-2 mt-2 font-bold text-2xl">R$ {asset.price}</div>
      </div>

      {/* Área do Formulário e Layout */}
      <div className="grid grid-cols-5 gap-4 flex-grow">
        {/* Seção do Formulário */}
        <div className="col-span-2">
          <Card>
            <Tabs className="gap-4">
              <TabsItem
                active
                title={<div className="text-blue-700 px-3 py-1">Comprar</div>}
              >
                <OrderForm asset={asset} wallet_id={wallet_id} type={OrderType.BUY} />
              </TabsItem>
              <TabsItem
                title={<div className="text-red-700 px-3 py-1">Vender</div>}
              >
                <OrderForm asset={asset} wallet_id={wallet_id} type={OrderType.SELL} />
              </TabsItem>
            </Tabs>
          </Card>
        </div>

        {/* Espaço vazio para ajustar layout */}
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} data={chartData} />
        </div>
      </div>
    </div>
  );
}



