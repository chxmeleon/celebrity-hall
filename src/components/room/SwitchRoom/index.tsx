import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import CircularProgress from '@mui/material/CircularProgress'
import { FormattedMessage } from 'react-intl'
import RoadCard from './RoadCard'

const QuickRoads = () => {
  const { rooms } = useContext(RoomDataContext)
  return (
    <>
      {rooms.length ? (
        <div className="overflow-y-auto w-full h-full text-sm text-gray-50 bg-theme-50/95">
          <div className="inline-flex justify-between items-center py-1.5 px-3 w-full bg-theme-75">
            <div className="py-0.5 px-3 bg-red-600 rounded-full">
              {rooms.length}
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
