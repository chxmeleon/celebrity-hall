import { useQuery } from '@apollo/client'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import RoomList from '@/components/room/RoomList'
import { useEffect } from 'react'

const Rooms: React.FC = () => {
  const { data, refetch } = useQuery(GET_BACCARATROOMS)
  const activeBaccaratRooms = data?.activeBaccaratRooms
  
  useEffect(() => {
    setInterval(()=> refetch(), 35000)
  }, [refetch])


  return (
    <div className="overflow-y-auto p-4 w-full h-full md:p-16">
      <RoomList roomsData={activeBaccaratRooms} />
    </div>
  )
}

export default Rooms
