import { useTimeLeft } from '@/hooks/rooms'
import { RoomProps } from '@/types/room'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { BigEyeRoad } from '../Roadmap'

type RoomDataProps = {
  room: RoomProps
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const RoadCard: React.FC<RoomDataProps> = ({ room, onClick }) => {
  const { counter, startCount, isLeftTen, isOpening } = useTimeLeft(room.id)
  
  

  return (
    <div
      onClick={onClick}
      id={room.id}
      className="flex justify-between items-center p-2 w-full h-10 rounded-md border hover:cursor-pointer border-theme-75 hover:bg-blue-500/40"
    >
      <div
        className={`${
          isLeftTen && startCount && counter !== undefined && counter > 0
            ? 'bg-red-500'
            : 'bg-link-button-54'
        }
        rounded-full p-[1px] flex pointer-events-none`}
      >
        <div className="flex justify-center items-center w-6 h-6 text-sm text-center rounded-full bg-theme-50">
          {startCount && counter !== undefined && counter > 0 ? (
            <p
              className={`${
                isLeftTen ? 'text-red-500' : 'text-theme-300'
              } font-bold`}
            >
              {counter}
            </p>
          ) : isOpening ? (
            <div className="text-theme-300">
              <FormattedMessage
                id="status.baccarat.waitingBet"
                defaultMessage="Open"
              />
            </div>
          ) : (
            <div className="text-theme-300">
              <FormattedMessage
                id="status.baccarat.openingCard"
                defaultMessage="Close"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-xs font-medium">
        <p>{room.name}</p>
      </div>

      <div className="w-1/3 bg-gray-100">
        {room && (
          <BigEyeRoad
            className="h-full"
            columnSize={8}
            roads={room.roads.big_eye_road.graph}
          />
        )}
      </div>
    </div>
  )
}

export default RoadCard
