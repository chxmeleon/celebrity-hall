import React, { createContext, useEffect, useMemo, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import { useLocation } from 'react-router-dom'

type RoomDataContextData = {
  isTablesPath?: boolean
  rooms: RoomProps[]
  refetch?: () => Promise<any>
  loading: boolean
}

const RoomDataContext = createContext<RoomDataContextData>(
  {} as RoomDataContextData
)

export const RoomDataProvider: React.FC<
  React.PropsWithChildren<{ type: string | undefined }>
> = ({ children, type = 'all' }) => {
  const location = useLocation()
  const isTablesPath = useMemo(
    () => location.pathname === '/home/tables',
    [location]
  )

  const { data, refetch, loading } = useQuery<
    types.GET_BACCARATROOMS,
    types.GET_BACCARATROOMSVariables
  >(GET_BACCARATROOMS, { variables: { type } })

  const rooms = useMemo(() => data?.activeBaccaratRooms || [], [data])
  console.log(rooms);
  

  return (
    <RoomDataContext.Provider
      value={{
        loading,
        isTablesPath,
        rooms,
        refetch
      }}
    >
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
