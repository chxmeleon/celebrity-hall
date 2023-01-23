import RoomList from '@/components/room/RoomList'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'

const Rooms: React.FC = () => {
  const { rooms, refetchRooms } = useContext(RoomDataContext)

  return (
    <div className="overflow-y-auto p-4 w-full h-full md:p-16">
      <RoomList rooms={rooms} refetch={refetchRooms} />
    </div>
  )
}

export default Rooms
