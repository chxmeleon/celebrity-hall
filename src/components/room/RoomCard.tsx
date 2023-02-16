import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { BigRoad, BigEyeRoad, SmallRoad, CockroachRoad } from './Roadmap'
import { useTimeLeft } from '@/hooks/rooms'
import { RoomProps } from '@/types/room'
import { cx } from 'class-variance-authority'
import { roadBorderClassName } from './Roadmap/road'
import RoomDataContext from '@/contexts/RoomDataContext'

type RoomDataProps = {
  room: RoomProps
}

const RoomCard: React.FC<RoomDataProps> = ({ room }) => {
  const { counter, startCount, isLeftTen, isOpening, isClose } = useTimeLeft(
    room.id
  )
  const { refetch: refetchRooms } = useContext(RoomDataContext)
  const href = `/home/room/${room.id}`
  const girl = room.girl

  useEffect(() => {
    if (isClose) {
      refetchRooms?.()
    }
  }, [refetchRooms, isClose])

  return (
    <Link to={href} key={href}>
      <div className="w-full h-full rounded-2xl hover:shadow-lg p-[1.4px] bg-link-button-54 hover:shadow-theme-300/60">
        <div className="flex flex-col w-full h-full rounded-2xl bg-theme-50">
          <div className="flex justify-start items-center pl-4 w-full h-12">
            <div
              className={`${
                isLeftTen && startCount && counter !== undefined && counter > 0
                  ? 'bg-red-500'
                  : 'bg-link-button-54'
              }
              rounded-sm p-[1.1px] `}
            >
              <div className="w-12 h-6 text-center rounded-sm bg-theme-50">
                {startCount && counter !== undefined && counter > 0 ? (
                  <p
                    className={`${
                      isLeftTen ? 'text-red-500' : 'text-theme-300'
                    } font-bold`}
                  >
                    {counter}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="pl-4 font-bold tracking-[0.15rem]">{room.name}</div>
          </div>
          <div className="flex px-3 w-full text-xs">
            <div className="block w-3/4 bg-gray-100 rounded-tl-sm rounded-bl-sm">
              {room && (
                <>
                  <BigRoad
                    className={cx('border-b-2', roadBorderClassName)}
                    roads={room.roads.big_road.array}
                    columnSize={20}
                  />

                  <BigEyeRoad
                    className={cx('border-b-2', roadBorderClassName)}
                    roads={room.roads.big_eye_road.graph}
                    columnSize={40}
                    rowSize={6}
                  />

                  <div className="flex w-full">
                    <SmallRoad
                      className={cx('w-1/2 border-r', roadBorderClassName)}
                      roads={room.roads.small_road.graph}
                      columnSize={20}
                      rowSize={6}
                    />

                    <CockroachRoad
                      className={cx('w-1/2 border-l', roadBorderClassName)}
                      roads={room.roads.cockroach_road.graph}
                      columnSize={20}
                      rowSize={6}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="relative w-1/4 h-full bg-gray-100 rounded-tr-sm rounded-br-sm">
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
          </div>
          <div className="flex justify-between px-3 w-full h-14">
            <div className="flex justify-between items-center w-2/3 h-full md:text-lg font-light [&_p]:pl-1 md:[&_p]:pl-3 text-white text-[11px]">
              <div className="inline-flex items-center">
                <div className="flex justify-center items-center w-5 h-5 rounded-full md:w-8 md:h-8 bg-red-600">
                  <FormattedMessage
                    id="common.simpleDealer"
                    defaultMessage="B"
                  />
                </div>
                <p>{room.roads.dealer_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="flex justify-center items-center w-5 h-5 rounded-full md:w-8 md:h-8 bg-blue-600">
                  <FormattedMessage
                    id="common.simplePlayer"
                    defaultMessage="P"
                  />
                </div>
                <p>{room.roads.player_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="flex justify-center items-center w-5 h-5 rounded-full md:w-8 md:h-8 bg-teal-600">
                  <FormattedMessage id="common.simpleTie" defaultMessage="T" />
                </div>
                <p>{room.roads.tie_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="flex justify-center items-center w-5 h-5 rounded-full md:w-8 md:h-8 bg-amber-500">
                  <FormattedMessage id="common.total" defaultMessage="A" />
                </div>
                <p>{room.roads.total_count}</p>
              </div>
            </div>
            <div className="flex h-full md:w-1/4">
              <button className="py-1 px-3 m-auto w-full text-xs font-medium text-gray-800 bg-gradient-to-r rounded-full md:p-2 hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200 md:text-[1rem] hover:from-theme-400 hover:to-theme-400">
                <FormattedMessage
                  id="screens.rooms.enterGame"
                  defaultMessage="Enter"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RoomCard
