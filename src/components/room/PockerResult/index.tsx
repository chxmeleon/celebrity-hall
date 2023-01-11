import React, { useEffect, useState } from 'react'
import CardWidget from './CardWidget'
import { useCurrentGameState } from '@/hooks/rooms'

const PockerResult: React.FC = () => {
  const { currentGameState } = useCurrentGameState()
  console.log(currentGameState?.status)
  const [show, setShow] = useState(true)
  const isOpenCard = currentGameState?.status === 'closed'

  useEffect(() => {
    if (isOpenCard) {
      setTimeout(() => {
        setShow(false)
      }, 7000)
    }
  }, [show, isOpenCard])

  return (
    <>
      {isOpenCard && show ? (
        <div className="flex w-full h-full rounded-xl border shadow-lg bg-theme-50/80 backdrop-blur-sm border-theme-150">
          <CardWidget role="player" open />
          <div className="w-1 h-full bg-theme-150"></div>
          <CardWidget role="dealer" open />
        </div>
      ) : null}
    </>
  )
}

export default PockerResult
