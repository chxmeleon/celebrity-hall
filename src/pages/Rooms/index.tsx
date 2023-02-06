import RoomList from '@/components/room/RoomList'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import Loading from '@/components/room/RoomStream/StreamLoading'

const Rooms: React.FC = () => {
  const { rooms } = useContext(RoomDataContext)

  return (
    <>
      {rooms.length ? (
        <div className="overflow-y-auto p-4 w-full h-full md:p-16">
          <RoomList rooms={rooms} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Rooms
