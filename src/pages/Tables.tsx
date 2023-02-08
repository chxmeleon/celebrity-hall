import TableCard from '@/components/room/Table/TableCard'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import { GamePlayProvider } from '@/contexts/GamePlayContext'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Responsive } from '@/hooks/useResponsive'
import TableCardMobile from '@/components/room/Table/TableCardMobile'

const Tables = () => {
  const { useGetRoomData } = useContext(RoomDataContext)
  const { rooms } = useGetRoomData('all')

  return (
    <>
      <Responsive.Desktop className="w-full h-full">
        {rooms.length ? (
          <div className="grid grid-cols-4 grid-rows-1 w-full">
            {rooms.slice(4, 8).map((item, idx) => (
              <div key={idx}>
                <GamePlayProvider>
                  <TableCard room={item} />
                </GamePlayProvider>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </Responsive.Desktop>

      <Responsive.Default className="w-full h-full">
        {rooms.length ? (
          <div className="overflow-y-scroll w-full h-full">
            {rooms.map((item, idx) => (
              <div key={idx}>
                <GamePlayProvider>
                  <TableCardMobile room={item} />
                </GamePlayProvider>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </Responsive.Default>
    </>
  )
}

export default Tables
