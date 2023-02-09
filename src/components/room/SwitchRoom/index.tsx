import CircularProgress from '@mui/material/CircularProgress'
import RoadCard from './RoadCard'
import { FormattedMessage } from 'react-intl'
import { RoomProps } from '@/types/room'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import RoadDrawer from './RoadDrawer'

const QuickRoads: React.FC<{ rooms: RoomProps[] }> = ({ rooms }) => {
  const { id: roomId } = useParams<{ id: string }>()
  const newRooms = useMemo(
    () => (roomId ? rooms.filter((room) => room.id !== roomId) : undefined),
    [roomId, rooms]
  )

  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [currentId, setCurrentId] = useState<string | undefined>()
  const handleToggleOpenDrawer = (e) => {
    setIsOpenDrawer(true)
    setCurrentId(e.currentTarget.id)
  }
  const currentData = rooms?.filter((room) => room.id === currentId)

  return (
    <>
      {newRooms?.length ? (
        <>
          <div className="overflow-y-auto w-full h-full text-sm text-gray-50 bg-theme-50/95">
            <div className="inline-flex justify-between items-center py-1 px-3 w-full text-xs bg-theme-75">
              <div className="px-2 bg-red-600 rounded-full py-[1px]">
                {newRooms?.length}
              </div>
              <FormattedMessage
                id="common.roadsList"
                defaultMessage="Roads List"
              />
            </div>
            {newRooms.map((room, idx) => (
              <RoadCard
                key={idx}
                room={room}
                onClick={handleToggleOpenDrawer}
              />
            ))}
          </div>

          <div className="fixed right-0 bottom-0 z-40 w-[365px] h-[153.6px]">
            <RoadDrawer
              isOpenDrawer={isOpenDrawer}
              setIsOpenDraw={setIsOpenDrawer}
              room={currentData[0]}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-theme-50/70">
          <CircularProgress thickness={6} sx={{ color: 'orange' }} />
        </div>
      )}
    </>
  )
}

export default QuickRoads
