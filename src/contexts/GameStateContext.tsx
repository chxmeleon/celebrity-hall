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
  baccaratData: types.GET_BACCARATROOMS | undefined | null
  room11: {
    data: types.GET_CURRENT_BACCARAT_ROOM | undefined
    gameState: string | null | undefined
    roads: any
    pockerState: any
  }
}

const GameStateContext = createContext<GameContextData>({} as GameContextData)
export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { data: baccaratData, refetch: baccaratDataRefetch } =
    useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS)
  const activeBaccaratRooms = baccaratData?.activeBaccaratRooms

  useEffect(() => {
    baccaratDataRefetch()
  }, [baccaratDataRefetch])

  const roomsId = activeBaccaratRooms?.map((item) => item?.id)
  const { currentGameState: room11 } = usePockerUpdate(roomsId?.[0])
  const value = { baccaratData, room11 }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
