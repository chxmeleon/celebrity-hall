import { useQuery } from '@apollo/client'
import { GET_BACCARATROOMS } from '@/gql/baccaratrooms'
import RoomList from '@/components/room/RoomList'

const Rooms: React.FC = () => {
  const { data } = useQuery(GET_BACCARATROOMS)
  const activeBaccaratRooms = data?.activeBaccaratRooms
  console.log(data);
  

  return (
    <div className="p-16 w-full h-full overflow-y-auto ">
      <RoomList roomsData={activeBaccaratRooms} />
    </div>
  )
}

export default Rooms
