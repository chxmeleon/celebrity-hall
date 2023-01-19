import { useQuery } from '@apollo/client'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import RoomList from '@/components/room/RoomList'
import { useEffect } from 'react'
import types from '@/types'

const Rooms: React.FC = () => {
  const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(GET_BACCARATROOMS)
  const activeBaccaratRooms = data?.activeBaccaratRooms

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="overflow-y-auto p-4 w-full h-full md:p-16">
      {activeBaccaratRooms && <RoomList roomsData={activeBaccaratRooms} />}
    </div>
  )
}

export default Rooms
