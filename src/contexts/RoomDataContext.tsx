import React, { createContext, useEffect, useMemo, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import { useLocation } from 'react-router-dom'

/* const RoomDataContext = createContext<{ */
/*   rooms: RoomProps[] */
/*   refetchAllRooms?: () => Promise<any> */
/*   liveRooms: RoomProps[] */
/*   refetchLiveRooms?: () => Promise<any> */
/*   mutualRooms: RoomProps[] */
/*   refetchMutualRooms?: () => Promise<any> */
/*   kgRooms: RoomProps[] */
/*   refetchKgRooms?: () => Promise<any> */
/*   isTablesPath?: boolean */
/* }>({ */
/*   rooms: [], */
/*   liveRooms: [], */
/*   mutualRooms: [], */
/*   kgRooms: [] */
/* }) */

type RoomDataContextData = {
  isTablesPath?: boolean
  useGetRoomData: (type: string) => {
    rooms: RoomProps[],
    refetch?: () => Promise<any>
  } 
}

const RoomDataContext = createContext<RoomDataContextData>(
  {} as RoomDataContextData
)

export const RoomDataProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const location = useLocation()
  const isTablesPath = useMemo(
    () => location.pathname === '/home/tables',
    [location]
  )

  const useGetRoomData = (type: string) => {
    const [rooms, setRooms] = useState<RoomProps[]>([])
    const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(
      GET_BACCARATROOMS,
      { variables: { type } }
    )

    useEffect(() => {
      if (data?.activeBaccaratRooms) {
        setRooms(data?.activeBaccaratRooms)
      }
    }, [data])

    return { rooms, refetch }
  }


  return (
    <RoomDataContext.Provider
      value={{
        isTablesPath,
        useGetRoomData
      }}
    >
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
