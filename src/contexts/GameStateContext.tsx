import React, { createContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {
  GET_BACCARATROOMS,
  GET_CURRENT_BACCARAT_ROOM
} from '@/gql/baccaratrooms'
import { v4 as uuidV4 } from 'uuid'
import { useActionCable } from './ActionCableContext'
import types from '@/types'
import { convertStatus } from '@/hooks/rooms'
import { pokerReducer, initialValue, usePokerUpdate } from '@/hooks/pocker'
import { useLocation } from 'react-router-dom'

type GameContextData = {
  isTable: boolean 
}


const GameStateContext = createContext<GameContextData>({} as GameContextData)
export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const location = useLocation()
  const isTable = location.pathname === '/home/tables'
  const value = { isTable }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
