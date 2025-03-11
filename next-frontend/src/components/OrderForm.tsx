 
"use client"

import { Asset, OrderType } from "@/models";
import { socket } from "@/socket-io";
import { Button, Label, TextInput } from 'flowbite-react'
import { FormEvent } from "react";
import { toast } from "react-toastify";

export async function OrderForm(props: { asset: Asset, wallet_id: string, type: OrderType }) {
  const color = props.type === OrderType.BUY ? 'text-blue-700' : 'text-red-700';
  const translatedType = props.type === OrderType.BUY ? 'compra' : 'venda';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    socket.connect();
    const newOrder = await socket.emitWithAck('orders/create', data);
    toast(`Ordem de ${translatedType} de  ${newOrder.shares} açoes de ${props.asset.symbol} criada com sucesso`, {
      type: 'success', position: 'top-right', 
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="assetId" defaultValue={props.asset._id} />
      <input type="hidden" name="walletId" defaultValue={props.wallet_id} />
      <input type="hidden" name="type" defaultValue={props.type} />
      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantidade" className={color} />
        </div>
        <TextInput
          id="shares"
          name="shares"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={props.type === OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <br />
      <div>
        <div className="mb-2">
          <Label htmlFor="price" value="Preço R$" className={color} />
        </div>
        <TextInput
          id="price"
          name="price"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={props.type === OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <br />
      <Button type="submit" color={props.type === OrderType.BUY ? "blue" : "failure"}>Confirmar {translatedType}</Button>
    </form>
  )
}


// export function OrderForm(props: { asset: Asset; wallet_id: string; type: OrderType }) {
//   const color = props.type === OrderType.BUY ? "text-blue-700" : "text-red-700";
//   const translatedType = props.type === OrderType.BUY ? "compra" : "venda";

//   const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const data = Object.fromEntries(formData.entries());
    
//     try {
//       socket.emitWithAck("orders/create", data)
//         .then((newOrder) => {
//           toast(
//             `Ordem de ${translatedType} de ${newOrder.shares} ações de ${props.asset.symbol} criada com sucesso`,
//             {
//               type: "success",
//               position: "top-right",
//             }
//           );
//         })
//         .catch((error) => {
//           toast(`Erro ao criar ordem: ${error.message}`, { type: "error" });
//         });
//     } catch (error: any) {
//       toast(`Erro ao enviar a ordem: ${error.message}`, { type: "error" });
//     }
//   }, [props.asset.symbol, translatedType]);

//   return (
//     <form onSubmit={onSubmit}>
//       <input type="hidden" name="assetId" defaultValue={props.asset._id} />
//       <input type="hidden" name="walletId" defaultValue={props.wallet_id} />
//       <input type="hidden" name="type" defaultValue={props.type} />
//       <div>
//         <div className="mb-2">
//           <Label htmlFor="shares" value="Quantidade" className={color} />
//         </div>
//         <TextInput
//           id="shares"
//           name="shares"
//           required
//           type="number"
//           min={1}
//           step={1}
//           defaultValue={1}
//           color={props.type === OrderType.BUY ? "info" : "failure"}
//         />
//       </div>
//       <br />
//       <div>
//         <div className="mb-2">
//           <Label htmlFor="price" value="Preço R$" className={color} />
//         </div>
//         <TextInput
//           id="price"
//           name="price"
//           required
//           type="number"
//           min={1}
//           step={1}
//           defaultValue={1}
//           color={props.type === OrderType.BUY ? "info" : "failure"}
//         />
//       </div>
//       <br />
//       <Button type="submit" color={props.type === OrderType.BUY ? "blue" : "failure"}>
//         Confirmar {translatedType}
//       </Button>
//     </form>
//   );
// }
