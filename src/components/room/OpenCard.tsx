import React from 'react'
import PockerCard from './PockerCard'

const OpenCard: React.FC = () => {



  return (
    <div className="flex w-full h-full rounded-xl bg-theme-50/80 backdrop-blur-sm border border-theme-150 shadow-lg">
      <PockerCard role="player" open={false} />
      <div className="w-1 h-full bg-theme-150"></div>
      <PockerCard role="dealer" open={false}/>
    </div>
  )
}

export default OpenCard
