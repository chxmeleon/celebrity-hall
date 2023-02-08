import RoomList from '@/components/room/RoomList'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import Loading from '@/components/room/RoomStream/StreamLoading'

const Rooms: React.FC<{ type: string }> = ({ type }) => {
  const { useGetRoomData } = useContext(RoomDataContext)
  const { rooms } = useGetRoomData(type)

  return (
    <>
      {rooms.length ? (
        <div className="overflow-y-auto p-4 w-full h-full md:p-16">
          <RoomList rooms={rooms} />
        </div>
      ) : (
        <Loading
          type={type === 'interaction' || type === 'live' ? 'fixed' : 'default'}
        />
      )}
    </>
  )
}

export default Rooms
