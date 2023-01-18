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
import { pockerReducer, initialValue, usePockerUpdate } from '@/hooks/pocker'

type GameContextData = {
  data: number 
}

const GameStateContext = createContext<GameContextData>({} as GameContextData)
export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const data = 0
  const value = { data }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
