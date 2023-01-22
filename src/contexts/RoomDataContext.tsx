import React, { createContext, useEffect, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'

const RoomDataContext = createContext<{
  rooms: RoomProps[]
  refetchRooms?: () => Promise<any>
}>({
  rooms: []
})

export const RoomDataProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [rooms, setRooms] = useState<RoomProps[]>([])

  const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS)

  useEffect(() => {
    if (data?.activeBaccaratRooms) {
      setRooms(data.activeBaccaratRooms)
    }
  }, [data])

  return (
    <RoomDataContext.Provider value={{ rooms, refetchRooms: refetch }}>
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
