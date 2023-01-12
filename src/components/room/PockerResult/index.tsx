import React, { useEffect, useState } from 'react'
import CardWidget from './CardWidget'
import { useCurrentGameState } from '@/hooks/rooms'
import { useParams } from 'react-router-dom'
import { useActionCable } from '@/contexts/ActionCableContext'

const PockerResult: React.FC = () => {
  const { currentGameState } = useCurrentGameState()
  const [show, setShow] = useState(true)
  const isOpenCard =
    currentGameState?.status !== 'waiting_for_bet' &&
    currentGameState?.status !== 'closed'

  const [gameState, setGameState] = useState<any | null>(null)
  const roomId = useParams()
  const { cable } = useActionCable()
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId.id },
      {
        received: (data: any) => {
          setGameState(data)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])

  console.log(gameState);
  
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (gameState?.command !== 'START_BET' && gameState?.command !== 'CLOSE') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [gameState])



  return (
    <div
      className={`${
        isOpen ? '' : 'opacity-0'
      } duration-200 ease-in-out flex w-full h-full rounded-xl border shadow-lg bg-theme-50/80 backdrop-blur-sm border-theme-150
`}
    >
      <CardWidget role="player" />
      <div className="w-1 h-full bg-theme-150"></div>
      <CardWidget role="dealer" />
    </div>
  )
}

export default PockerResult
