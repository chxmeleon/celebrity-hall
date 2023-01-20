import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import {
  BigRoad,
  BeadRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad
} from './Roadmap'
import { useTimeLeft } from '@/hooks/rooms'
import { RoomProps } from '@/types/room'
import { cx } from 'class-variance-authority'
import { roadBorderClassName } from './Roadmap/road'

type RoomDataProps = {
  room: RoomProps
}

const RoomCard: React.FC<RoomDataProps> = ({ room }) => {
  const { counter, startCount, isLeftTen, isOpening } = useTimeLeft(room.id)
  const href = `/home/rooms/${room.id}`
  const girl = room.girl

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
              <div className="w-6 h-6 text-center rounded-sm bg-theme-50">
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
            <div className="pl-4 font-bold tracking-[0.15rem]">{room.name}</div>
          </div>

          <div className="flex flex-grow-0 flex-shrink-0 px-3 w-full text-xs overflow-hidden">
            <div className="w-3/4 float-left pb-[100%] mb-[-100%] bg-gray-100 rounded-tl-sm rounded-bl-sm">
              {room && (
                <>
                  <div className={cx('w-full border-b-2', roadBorderClassName)}>
                    <BigRoad roads={room.roads.big_road.array} />
                  </div>

                  <BigEyeRoad
                    className={cx('w-full border-b-2', roadBorderClassName)}
                    roads={room.roads.big_eye_road.graph}
                    roadLength={30}
                    maxRowSize={3}
                  />

                  <div className="w-full flex">
                    <SmallRoad
                      className={cx('w-1/2 border-r', roadBorderClassName)}
                      roads={room.roads.small_road.graph}
                      maxColumnSize={15}
                      maxRowSize={3}
                    />

                    <CockroachRoad
                      className={cx('w-1/2 border-l', roadBorderClassName)}
                      roads={room.roads.cockroach_road.graph}
                      maxColumnSize={15}
                      maxRowSize={3}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="relative w-1/4 h-full bg-gray-100 rounded-tr-sm rounded-br-sm">
              <div className="absolute bottom-0 w-full">
                <div className="flex justify-end">
                  <div className="absolute right-0 top-4">
                    <div className="p-1 text-lg font-medium text-gray-50">
                      {isOpening ? (
                        <FormattedMessage
                          id="status.baccarat.waitingBet"
                          defaultMessage="Open"
                        />
                      ) : (
                        <FormattedMessage
                          id="status.baccarat.openingCard"
                          defaultMessage="Close"
                        />
                      )}
                    </div>
                  </div>
                  <div className="border-b-[#F9A415] border-b-[50px] border-l-[57px] border-transparent"></div>
                </div>
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
            <div className="flex justify-between items-center w-1/2 h-full md:text-lg font-light [&_p]:pl-1 md:[&_p]:pl-3 text-white text-xs">
              <div className="inline-flex items-center">
                <div className="rounded-full md:py-0.5 md:px-1.5 py-[1px] px-[3px] bg-grid-100">
                  <FormattedMessage id="common.dealer" defaultMessage="B" />
                </div>
                <p>{room.roads.dealer_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="rounded-full md:py-0.5 md:px-1.5 py-[1px] px-[3px] bg-grid-400">
                  <FormattedMessage id="common.player" defaultMessage="P" />
                </div>
                <p>{room.roads.player_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="rounded-full md:py-0.5 md:px-1.5 py-[1px] px-[3px] bg-grid-300">
                  <FormattedMessage id="common.tie" defaultMessage="T" />
                </div>
                <p>{room.roads.tie_count}</p>
              </div>
            </div>
            <div className="flex w-1/4 h-full">
              <button className="p-1 py-2 m-auto w-full text-xs font-medium text-gray-800 bg-gradient-to-r rounded-full hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200 md:text-[1rem] hover:from-theme-400 hover:to-theme-400">
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
