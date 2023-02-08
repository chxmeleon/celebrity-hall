import RoomList from '@/components/room/RoomList'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import Loading from '@/components/room/RoomStream/StreamLoading'

const Rooms: React.FC<{ type: string }> = ({ type }) => {
  const { rooms, liveRooms, mutualRooms, kgRooms } = useContext(RoomDataContext)
  const allRoomsData = { rooms, liveRooms, mutualRooms, kgRooms }
  console.log(allRoomsData['liveRooms']);
  

  return (
    <>
      {allRoomsData[type].length  ? (
        <div className="overflow-y-auto p-4 w-full h-full md:p-16">
          <RoomList rooms={allRoomsData[type]} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Rooms
