import TableCard from '@/components/room/Table/TableCard'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import { GamePlayProvider } from '@/contexts/GamePlayContext'


const Tables = () => {
  const { rooms } = useContext(RoomDataContext)

  return (
    <div className="grid grid-cols-4 grid-rows-1 w-full">
      {rooms.slice(4, 8).map((item, idx) => (
        <div key={idx}>
          <GamePlayProvider>
            <TableCard room={item} />
          </GamePlayProvider>
        </div>
      ))}
    </div>
  )
}

export default Tables
