 
// "use client"

// import { Asset } from "@/models";
// import { socket } from "@/socket-io";
// import { useAssetStore } from "@/store";
// import { useEffect } from 'react';
 
// export function AssetsSync(props: { assetSymbols: string[] }) {

//   const { assetSymbols } = props;

//   const changeAsset = useAssetStore(state => state.changeAsset);
//   useEffect(() => {
//     socket.connect();

//     socket.emit("joinAssets", { symbols: assetSymbols });
//     socket.on("assets/price-changed", (asset: Asset) => {
//       changeAsset(asset);
//       console.log(asset);
//     })

//     return () => {
//       socket.emit("leaveAssets", { symbols: assetSymbols });
//       socket.off("assets/price-changed");
//     }
//   }, [assetSymbols, changeAsset])
//   return null;
// }
// 2
// "use client";

// import { Asset } from "@/models";
// import { socket } from "@/socket-io";
// import { useAssetStore } from "@/store";
// import { useEffect } from "react";

// export function AssetsSync({ assetSymbols }: { assetSymbols: string[] }) {
//   const changeAsset = useAssetStore((state) => state.changeAsset);

//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//       console.log("🔗 Conectando ao servidor Socket.IO...");
//     }

//     socket.on("connect", () => {
//       console.log("✅ Conectado ao servidor Socket.IO:", socket.id);

//       // Emitir apenas após conexão bem-sucedida
//       socket.emit("joinAssets", { symbols: assetSymbols });
//       console.log("📡 Enviado joinAssets:", assetSymbols);
//     });

//     socket.on("assets/price-changed", (asset: Asset) => {
//       changeAsset(asset);
//       console.log("📈 Preço do ativo alterado:", asset);
//     });

//     socket.on("connect_error", (error: Error) => {
//       console.error("❌ Erro ao conectar ao servidor Socket.IO:", error.message);
//     });

//     socket.on("disconnect", () => {
//       console.log("🚪 Desconectado do servidor Socket.IO:", socket.id);
//     });

//     return () => {
//       socket.emit("leaveAssets", { symbols: assetSymbols });
//       socket.off("assets/price-changed");
//       socket.off("connect");
//       socket.off("connect_error");
//       socket.off("disconnect");
//       console.log("🧹 Desconectando eventos do servidor Socket.IO.");
//     };
//   }, [assetSymbols, changeAsset]);

//   return null;
// }
"use client";

import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { useAssetStore } from "@/store";
import { useEffect } from "react";

export function AssetsSync({ assetSymbols }: { assetSymbols: string[] }) {
  const changeAsset = useAssetStore((state) => state.changeAsset);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("🔗 Conectando ao servidor Socket.IO...");
    }

    socket.on("connect", () => {
      console.log("✅ Conectado ao servidor Socket.IO:", socket.id);

      // Emitir apenas após conexão bem-sucedida
      socket.emit("joinAssets", { symbols: assetSymbols });
      console.log("📡 Enviado joinAssets:", assetSymbols);
    });

    socket.on("assets/price-changed", (asset: Asset) => {
      changeAsset(asset);
      console.log("📈 Preço do ativo alterado:", asset);
    });

    socket.on("connect_error", (error: Error) => {
      console.error("❌ Erro ao conectar ao servidor Socket.IO:", error.message);
    });

    socket.on("disconnect", () => {
      console.log("🚪 Desconectado do servidor Socket.IO:", socket.id);
    });

    return () => {
      // Remova a parte de "desconectar" ou "remover eventos" para não limpar os listeners
      // Não vamos usar `socket.off()` ou `socket.disconnect()` aqui.
      console.log("🧹 Eventos do servidor Socket.IO não desconectados.");
    };
  }, [assetSymbols, changeAsset]);

  return null;
}



