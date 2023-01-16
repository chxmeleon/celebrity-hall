import { useQuery } from '@apollo/client'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import RoomList from '@/components/room/RoomList'
import { useEffect } from 'react'

const Rooms: React.FC = () => {
  const { data } = useQuery(GET_BACCARATROOMS)
  const activeBaccaratRooms = data?.activeBaccaratRooms

  return (
    <div className="overflow-y-auto p-4 w-full h-full md:p-16">
      <RoomList roomsData={activeBaccaratRooms} />
    </div>
  )
}

export default Rooms
