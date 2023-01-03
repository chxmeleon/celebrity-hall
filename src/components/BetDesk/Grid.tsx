import React from 'react'
import { btnIdx } from './deskStyle'

type MultiProps = {
  isActive: boolean
  idx: number
}

const MultiGrid: React.FC<MultiProps> = ({isActive, idx}) => {
  return (
    <>
      {idx === 0 ? (
        <div className={isActive ? btnIdx.isUserL : btnIdx.bln} />
      ) : idx === 6 ? (
        <div className={isActive ? btnIdx.isUserR : btnIdx.brn} />
      ) : (
        <div className={isActive ? btnIdx.isUserN : btnIdx.bnn} />
      )}
    </>
  )
}

export default MultiGrid
