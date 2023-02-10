import TableCard from '@/components/room/Table/TableCard'
import { useContext, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import { GamePlayProvider } from '@/contexts/GamePlayContext'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Responsive } from '@/hooks/useResponsive'
import TableCardMobile from '@/components/room/Table/TableCardMobile'
import GamePlayContext from '@/contexts/GamePlayContext'

const Tables = () => {
  const { rooms } = useContext(RoomDataContext)
  const [selectedChip, setSelectedChip] = useState('chips_100')
  const [roomCameraActived, setRoomCameraActived] = useState<number | null>(null)



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
          <div className="relative w-full h-full">
            <div className="overflow-y-scroll py-4 pb-10 px-2 w-full h-full">
              {rooms.map((item, idx) => (
                <div key={idx}>
                  <GamePlayProvider>
                    <TableCardMobile room={item} />
                  </GamePlayProvider>
                </div>
              ))}
            </div>
            <div className="fixed bottom-0 z-40 w-full h-14 bg-black"></div>
          </div>
        ) : (
          <Loading />
        )}
      </Responsive.Default>
    </>
  )
}

export default Tables
