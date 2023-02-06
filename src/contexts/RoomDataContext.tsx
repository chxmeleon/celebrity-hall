import React, { createContext, useEffect, useMemo, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import { useLocation } from 'react-router-dom'

const RoomDataContext = createContext<{
  rooms: RoomProps[]
  refetchRooms?: () => Promise<any>
  isTablesPath?: boolean
}>({
  rooms: [],
})

export const RoomDataProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const location = useLocation()
  const isTablesPath = useMemo(() => location.pathname === '/home/tables', [location])
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS)

  useEffect(() => {
    if (data?.activeBaccaratRooms) {
      setRooms(data.activeBaccaratRooms)
    }
  }, [data])

  return (
    <RoomDataContext.Provider value={{ rooms, refetchRooms: refetch, isTablesPath }}>
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
