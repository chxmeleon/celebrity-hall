import CircularProgress from '@mui/material/CircularProgress'
import RoadCard from './RoadCard'
import { FormattedMessage } from 'react-intl'
import { RoomProps } from '@/types/room'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

const QuickRoads: React.FC<{rooms: RoomProps[]}> = ({rooms}) => {
  const { id: roomId } = useParams<{ id: string }>()
  const newRooms = useMemo(
    () => (roomId ? rooms.filter((room) => room.id !== roomId) : undefined),
    [roomId, rooms]
  )

  return (
    <>
      {newRooms?.length ? (
        <div className="overflow-y-auto w-full h-full text-sm text-gray-50 bg-theme-50/95">
          <div className="text-xs inline-flex justify-between items-center py-1 px-3 w-full bg-theme-75">
            <div className="py-[1px] px-2 bg-red-600 rounded-full">
              {newRooms?.length}
            </div>
            <FormattedMessage
              id="common.roadsList"
              defaultMessage="Roads List"
            />
          </div>
          {rooms.map((room, idx) => (
            <RoadCard key={idx} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-theme-50/70">
          <CircularProgress thickness={6} sx={{ color: 'orange' }} />
        </div>
      )}
    </>
  )
}

export default QuickRoads
