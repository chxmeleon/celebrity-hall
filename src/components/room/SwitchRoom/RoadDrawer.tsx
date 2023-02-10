import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import GamePlayContext, { GamePlayProvider } from '@/contexts/GamePlayContext'
import { useContext } from 'react'
import PokerResult from '../PockerResult'
import { BigRoad } from '../Roadmap'

const RoadDrawer: React.FC<{
  isOpenDrawer: boolean
  setIsOpenDraw: React.Dispatch<React.SetStateAction<boolean>>
  room: any
}> = ({ isOpenDrawer, setIsOpenDraw, room }) => {
  const navigate = useNavigate()
  const href = `/home/room/${room?.id}`
  const girl = room?.girl
  const onNavigate = () => {
    navigate(href)
    setIsOpenDraw(false)
  }

  return (
    <GamePlayProvider>
      <div
        className={cx(
          isOpenDrawer
            ? ''
            : 'hidden ',
          'absolute left-0 bottom-0 w-[365px] h-[153.6px] bg-theme-70'
        )}
      >
        <div className={cx("flex flex-col w-full h-full", isOpenDrawer ? '' : 'hidden')}>
          <div className="flex justify-between items-center py-0.5 px-1.5 w-full h-8 text-xs bg-theme-50/10">
            <div className="font-bold text-gray-50">{room?.name}</div>
            <div className="inline-flex justify-end">
              <button onClick={onNavigate} className="text-center">
                <div className="flex px-3 rounded-full border border-theme-300 text-theme-300 hover:bg-theme-300 hover:text-theme-50">
                  <FormattedMessage
                    id="screens.baccaratRooms.enterRoom"
                    defaultMessage="Enter"
                  />
                </div>
              </button>
              <button
                onClick={() => setIsOpenDraw(false)}
                className="ml-3 text-xl i-heroicons-x-circle"
              ></button>
            </div>
          </div>
          {room && (
            <div className="flex h-[120px] gap-1 items-center w-full">
              <div className="relative w-1/3 h-full">
                <div className="absolute bottom-0 w-full">
                  <div className="w-full font-medium tracking-widest text-center p-[1px] bg-theme-50/75">
                    {girl?.name}
                  </div>
                </div>
                <div className="overflow-hidden w-full h-full">
                  {girl?.avatar && (
                    <img
                      src={girl?.avatar}
                      alt="Dealer avatar"
                      className="object-cover object-top w-full h-full"
                    />
                  )}
                </div>
              </div>
              <div className="w-2/3 h-full bg-gray-50">
                <BigRoad columnSize={12} roads={room.roads.big_road.array} />
              </div>
            </div>
          )}
        </div>
      </div>
    </GamePlayProvider>
  )
}

export default RoadDrawer
