import React from 'react'
import RoomCard from './RoomCard'

interface DataRows {
  id: string
  name: string
  girls: {
    avatar: string
    id: string
    name: string
  }
}

interface RoomListProps<T> {
  roomsData: T[]
}

const RoomList: React.FC<RoomListProps<DataRows>> = ({ roomsData }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 grid-flow-row auto-rows-fr gap-5 w-full h-4/5">
      {roomsData?.map((item, idx) => {
        return (
          <div key={`active-room-${idx}`}>
            <RoomCard data={item} />
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
