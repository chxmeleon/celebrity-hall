import React, { useEffect, useState } from 'react'
import CardWidget from './CardWidget'
import { useCurrentGameState } from '@/hooks/rooms'
import { useParams } from 'react-router-dom'
import { useActionCable } from '@/contexts/ActionCableContext'

const PockerResult: React.FC = () => {
  const roomId = useParams()
  const { cable } = useActionCable()
  const { currentGameState } = useCurrentGameState()
  const [gameState, setGameState] = useState<any | null>(
    currentGameState?.status
  )

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId.id },
      {
        received: (data: any) => {
          setGameState(data.command)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (
      gameState !== 'START_BET' &&
      gameState !== 'CLOSE' &&
      gameState !== 'UPDATE_AMOUNT' &&
      gameState !== 'SHUFFLE'
    ) {
      setIsOpen(true)
    } else if (gameState === 'waiting_for_bet') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [gameState])

  console.log(gameState)

  return (
    <div
      className={`${
        isOpen ? '' : 'opacity-0'
      } transition-opacity duration-300 ease-in flex w-full h-full rounded-xl border shadow-lg bg-theme-50/80 backdrop-blur-sm border-theme-150
`}
    >
      <CardWidget role="player" />
      <div className="w-1 h-full bg-theme-150"></div>
      <CardWidget role="dealer" />
    </div>
  )
}

export default PockerResult
