import TableCard from '@/components/room/Table/TableCard'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'




const Tables = () => {
  const { rooms } = useContext(RoomDataContext)

  return (
    <div className="grid grid-cols-4 grid-rows-1 w-full">
      {rooms.slice(4, 8).map((item, idx) => (
        <div key={idx}>
          <TableCard room={item} />
        </div>
      ))}
    </div>
  )
}

export default Tables
