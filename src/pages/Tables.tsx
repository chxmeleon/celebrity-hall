import TableCard from '@/components/room/Table/TableCard'
import { useContext, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import { GamePlayProvider } from '@/contexts/GamePlayContext'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Responsive } from '@/hooks/useResponsive'
import TableCardMobile from '@/components/room/Table/TableCardMobile'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'


const Tables = () => {
  const { rooms } = useContext(RoomDataContext)
  const [selectedChip, setSelectedChip] = useState('chips_100')
  const [activeId, setActiveId] = useState<string | undefined>(rooms[0]?.id)


  return (
    <>
      <Responsive.Desktop className="w-full h-full">
        {rooms.length ? (
          <div className="grid grid-cols-4 grid-rows-1 w-full">
            {rooms.slice(4, 8).map((item, idx) => {
              const isActived = activeId === item?.id
              return (
                <div
                  className="relative"
                  onClick={(e) => setActiveId(e.currentTarget.id)}
                  id={item?.id}
                  key={idx}
                >
                  <div
                    className={cx(
                      isActived ? 'w-full h-full border border-amber-300' : '',
                      'absolute z-[10]  pointer-events-none'
                    )}
                  ></div>
                  <GamePlayProvider>
                    <TableCard room={item} isActived={isActived} />
                  </GamePlayProvider>
                </div>
              )
            })}
          </div>
        ) : (
          <Loading />
        )}
      </Responsive.Desktop>

      <Responsive.Default className="w-full h-full">
        {rooms.length ? (
          <div className="relative w-full h-full">
            <div className="overflow-y-scroll py-4 px-2 pb-10 w-full h-full">
              {rooms.map((item, idx) => {
                const isActived = activeId === item?.id
                return (
                  <div
                    className="relative"
                    onClick={(e) => setActiveId(e.currentTarget.id)}
                    id={item?.id}
                    key={idx}
                  >
                    <div
                      className={cx(
                        isActived
                          ? 'w-full h-full  brightness-105 backdrop-brightness-110 shadow-md shadow-theme-300'
                          : '',
                      )}
                    >
                      <GamePlayProvider>
                        <TableCardMobile room={item} isActived={isActived} />
                      </GamePlayProvider>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Responsive.Default>
    </>
  )
}

export default Tables
