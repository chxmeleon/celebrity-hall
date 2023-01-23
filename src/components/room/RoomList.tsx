import { RoomProps } from '@/types/room'
import React from 'react'
import RoomCard from './RoomCard'

interface RoomListProps<T> {
  rooms: T[]
  refetch?: () => Promise<any>
}

const RoomList: React.FC<RoomListProps<RoomProps>> = ({ rooms, refetch }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 w-full md:grid-cols-2">
      {rooms.map((item, idx) => (
        <div key={idx}>
          <RoomCard room={item} refetch={refetch} />
        </div>
      ))}
    </div>
  )
}

export default RoomList
