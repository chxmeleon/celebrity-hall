import RoomList from '@/components/room/RoomList'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { useParams } from 'react-router-dom'

const Rooms: React.FC = () => {
  const { rooms, loading } = useContext(RoomDataContext)
  const { type } = useParams<{ type: string }>()


  return (
    <>
      {loading ? (
        <div className="w-full">
          <Loading
            type={type === 'live' || type === 'interaction' ? 'fixed' : 'default'}
          />
        </div>
      ) : rooms.length ? (
        <div className="overflow-y-auto p-4 w-full h-full md:p-16 bg-black">
          <RoomList rooms={rooms} />
        </div>
      ) : (
        <div className="w-full">
          <Loading
            type={
              type === 'live' || type === 'interaction' ? 'fixed' : 'default'
            }
          />
        </div>
      )}
    </>
  )
}

export default Rooms
