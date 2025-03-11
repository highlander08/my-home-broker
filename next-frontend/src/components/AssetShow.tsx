/* eslint-disable @next/next/no-img-element */
import type { Asset } from '@/models'
import React from 'react'

export const AssetShow = (props: { asset: Asset }) => {
  const { asset } = props 
  return (
    <div className="flex space-x-1">
      <div className="content-center">
        <img
          src={asset.image_url || "http://localhost:9000/default.png"}
          alt={asset.symbol || "Ativo"}
          width={30}
          height={30}
        />
      </div>
      <div className="flex flex-col text-sm">
        <span>{asset.name || "Desconhecido"}</span>
        <span>{asset.symbol || "N/A"}</span>
      </div>
    </div>
  )
}

export default AssetShow