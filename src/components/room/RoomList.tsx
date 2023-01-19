import React from 'react'
import RoomCard from './RoomCard'

interface RoomListProps<T> {
  roomsData: T[]
}

const RoomList: React.FC<RoomListProps<any>> = ({ roomsData }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 w-full h-auto md:grid-cols-2">
      {roomsData.map((item, idx) => {
        return (
          <div key={`active-room-${idx}`}>
            <RoomCard room={item} />
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
