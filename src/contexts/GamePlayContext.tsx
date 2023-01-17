import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useQuery } from '@apollo/client'
import { chipReducer, betInitialValue, BetInitialValueProp } from '@/hooks/bet'
import { useLocation } from 'react-router-dom'

type GamePlayContextData = {
  selectedChip: string
  setSelectedChip: React.Dispatch<React.SetStateAction<string>>
  betState: BetInitialValueProp
  dispatchBet: React.Dispatch<any>
}

const GamePlayContext = createContext<GamePlayContextData>(
  {} as GamePlayContextData
)
export const GamePlayProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const preLocation = useLocation().pathname
  const [location, setLocation] = useState(preLocation)
  const [selectedChip, setSelectedChip] = useState('chips_10')
  const [betState, dispatchBet] = useReducer(chipReducer, betInitialValue)

  useEffect(() => {
    if (preLocation !== location) {
      return dispatchBet({ type: 'cancel' })
    }
  }, [preLocation, location, dispatchBet])

  const value = { selectedChip, setSelectedChip, betState, dispatchBet }

  return (
    <GamePlayContext.Provider value={value}>
      {children}
    </GamePlayContext.Provider>
  )
}

export default GamePlayContext
