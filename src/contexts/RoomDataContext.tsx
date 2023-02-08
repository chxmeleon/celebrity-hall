import React, { createContext, useEffect, useMemo, useState } from 'react'
import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import types from '@/types'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import { useLocation } from 'react-router-dom'

const RoomDataContext = createContext<{
  rooms: RoomProps[]
  refetchAllRooms?: () => Promise<any>
  liveRooms: RoomProps[]
  refetchLiveRooms?: () => Promise<any>
  mutualRooms: RoomProps[]
  refetchMutualRooms?: () => Promise<any>
  kgRooms: RoomProps[]
  refetchKgRooms?: () => Promise<any>
  isTablesPath?: boolean
}>({
  rooms: [],
  liveRooms: [],
  mutualRooms: [],
  kgRooms: []
})

export const RoomDataProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const location = useLocation()
  const isTablesPath = useMemo(
    () => location.pathname === '/home/tables',
    [location]
  )

  const [rooms, setRooms] = useState<RoomProps[]>([])
  const { data: allData, refetch: allRoomsRefetch } =
    useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS, {
      variables: { type: 'all' }
    })

  const [liveRooms, setLiveRooms] = useState<RoomProps[]>([])
  const { data: liveData, refetch: liveRoomsRefetch } =
    useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS, {
      variables: { type: 'live' }
    })

  const [mutualRooms, setMutualRooms] = useState<RoomProps[]>([])
  const { data: mutualData, refetch: mutualRoomsRefetch } =
    useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS, {
      variables: { type: 'interaction' }
    })

  const [kgRooms, setKgRooms] = useState<RoomProps[]>([])
  const { data: kgData, refetch: kgRoomsRefetch } =
    useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS, {
      variables: { type: 'kg' }
    })

  useEffect(() => {
    if (allData?.activeBaccaratRooms) {
      setRooms(allData.activeBaccaratRooms)
    }

    if (liveData?.activeBaccaratRooms) {
      setLiveRooms(liveData.activeBaccaratRooms)
    }

    if (mutualData?.activeBaccaratRooms) {
      setMutualRooms(mutualData?.activeBaccaratRooms)
    }

    if (kgData?.activeBaccaratRooms) {
      setKgRooms(kgData?.activeBaccaratRooms)
    }
  }, [allData, liveData, mutualData, kgData])

  return (
    <RoomDataContext.Provider
      value={{
        rooms,
        refetchAllRooms: allRoomsRefetch,
        liveRooms,
        refetchLiveRooms: liveRoomsRefetch,
        mutualRooms,
        refetchMutualRooms: mutualRoomsRefetch,
        kgRooms,
        refetchKgRooms: kgRoomsRefetch,
        isTablesPath
      }}
    >
      {children}
    </RoomDataContext.Provider>
  )
}

export default RoomDataContext
