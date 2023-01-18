import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useQuery } from '@apollo/client'
import { chipReducer, betInitialValue, BetInitialValueProp } from '@/hooks/bet'
import { useLocation } from 'react-router-dom'
import { useActionCable } from './ActionCableContext'
import { GET_WALLET } from '@/gql/profile'

type GamePlayContextData = {
  selectedChip: string
  setSelectedChip: React.Dispatch<React.SetStateAction<string>>
  betState: BetInitialValueProp
  dispatchBet: React.Dispatch<any>
  wallet: any
}

const GamePlayContext = createContext<GamePlayContextData>(
  {} as GamePlayContextData
)
export const GamePlayProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const preLocation = useLocation().pathname
  const [location, setLocation] = useState(preLocation)
  const [selectedChip, setSelectedChip] = useState('chips_100')
  const [betState, dispatchBet] = useReducer(chipReducer, betInitialValue)

  useEffect(() => {
    if (preLocation !== location) {
      return dispatchBet({ type: 'cancel' })
    }
  }, [preLocation, location, dispatchBet])

  const { data, refetch } = useQuery(GET_WALLET)
  const { cable } = useActionCable()

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'WalletChannel' },
      {
        received: (data) => {
          if (data) {
            refetch()
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, refetch])
  const wallet = data?.wallet

  const value = { selectedChip, setSelectedChip, betState, dispatchBet, wallet }

  return (
    <GamePlayContext.Provider value={value}>
      {children}
    </GamePlayContext.Provider>
  )
}

export default GamePlayContext
