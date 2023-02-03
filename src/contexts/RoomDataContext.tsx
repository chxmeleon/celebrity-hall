import React, { createContext, useEffect, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import { useLocation } from 'react-router-dom'

const RoomDataContext = createContext<{
  rooms: RoomProps[]
  refetchRooms?: () => Promise<any>
  isTable?: boolean
}>({
  rooms: [],
})

export const RoomDataProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const location = useLocation()
  const isTable = location.pathname === '/home/tables'
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS)

  useEffect(() => {
    if (data?.activeBaccaratRooms) {
      setRooms(data.activeBaccaratRooms)
    }
  }, [data])

  return (
    <RoomDataContext.Provider value={{ rooms, refetchRooms: refetch, isTable }}>
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
