// "use client"

// import AssetShow from "@/components/AssetShow";
// import { Asset } from "@/models";
// import { useAssetStore } from "@/store";
// import { Button, TableCell, TableRow } from "flowbite-react";
// import Link from "next/link";
// import { useShallow } from "zustand/shallow";

// export function TableAssetRow(props: { asset: Asset, walletId: string }) {
//   const { asset, walletId } = props;

//   const assetFound = useAssetStore(useShallow((state) => state.assets.find(a => a.symbol === asset.symbol)));
//   const asset_ = assetFound || asset;
//   return (
//     <TableRow >
//       <TableCell>
//         <AssetShow asset={asset_} />
//       </TableCell>
//       <TableCell>R$ {asset_.price?.toFixed(2) || "0.00"}</TableCell>
//       <TableCell>
//         <Button
//           className="w-fit"
//           color="light"
//           as={Link}
//           href={`/assets/${asset_.symbol}?wallet_id=${walletId}`}
//         >
//           Comprar/vender
//         </Button>
//       </TableCell>
//     </TableRow>
//   ))
//               ) : (
//     <TableRow>
//       <TableCell colSpan={3} className="text-center">
//         Nenhum ativo disponível.
//       </TableCell>
//     </TableRow>
//   )
// }
"use client";

import AssetShow from "@/components/AssetShow";
import { Asset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
// import { useShallow } from "zustand/react/shallow";

export function TableAssetRow({ asset, walletId }: { asset: Asset; walletId: string }) {
  // const assetFound = useAssetStore(useShallow((state) => state.assets.find((a) => a.symbol === asset.symbol)));
  const assetFound = useAssetStore((state) =>
    state.assets.find((a) => a.symbol === asset.symbol)
  );
  const asset_ = assetFound || asset;

  return (
    <TableRow>
      <TableCell>
        <AssetShow asset={asset_} />
      </TableCell>
      <TableCell>R$ {asset_.price?.toFixed(2) || "0.00"}</TableCell>
      <TableCell>
        <Button
          className="w-fit"
          color="light"
          as={Link}
          href={`/assets/${asset_.symbol}?wallet_id=${walletId}`}
        >
          Comprar/vender
        </Button>
      </TableCell>
    </TableRow>
  );
}
