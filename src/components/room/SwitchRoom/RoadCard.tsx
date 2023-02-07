import { useTimeLeft } from '@/hooks/rooms'
import { RoomProps } from '@/types/room'
import { FormattedMessage } from 'react-intl'
import { SmallRoad } from '../Roadmap'

type RoomDataProps = {
  room: RoomProps
}

const RoadCard: React.FC<RoomDataProps> = ({ room }) => {
  const { counter, startCount, isLeftTen, isOpening, isClose } = useTimeLeft(
    room.id
  )

  return (
    <div>
      <div className="flex justify-between items-center p-2 w-full border border-theme-75 h-10">
        <div
          className={`${
            isLeftTen && startCount && counter !== undefined && counter > 0
              ? 'bg-red-500'
              : 'bg-link-button-54'
          }
          rounded-full p-[1px] flex`}
        >
          <div className="flex justify-center items-center w-6 h-6 text-center rounded-full bg-theme-50">
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

        <div className="text-xs text-theme-300">
          <p>{room.name}</p>
        </div>

        <div className="w-1/3  flex-shrink-0 bg-gray-100">
          {room && <SmallRoad columnSize={8} roads={room.roads.big_road.array} className="border-t border-l" />}
        </div>
      </div>
    </div>
  )
}

export default RoadCard
