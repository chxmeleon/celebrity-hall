import TableCard from '@/components/room/Table/TableCard'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import { GamePlayProvider } from '@/contexts/GamePlayContext'
import Loading from '@/components/room/RoomStream/StreamLoading'

const Tables = () => {
  const { useGetRoomData } = useContext(RoomDataContext)
  const { rooms } = useGetRoomData('all')

  return (
    <>
      {rooms.length ? (
        <div className="grid grid-cols-4 grid-rows-1 w-full">
          {rooms.slice(4, 8).map((item, idx) => (
            <div key={idx}>
              <GamePlayProvider>
                <TableCard room={item} />
              </GamePlayProvider>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Tables
