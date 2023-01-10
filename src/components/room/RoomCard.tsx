import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle as bts } from '@/components/common/buttonStyle'
import { FormattedMessage } from 'react-intl'

type RoomDataProps = {
  data: any
}

const RoomCard: React.FC<RoomDataProps> = ({ data }) => {
  console.log(data)

  const href = `/home/rooms/${data?.id}`
  const girl = data?.girl

  return (
    <Link to={href} key={href}>
      <div className="w-full h-full rounded-2xl p-[1.4px] bg-link-button-54">
        <div className="flex flex-col w-full h-full rounded-2xl bg-theme-50">
          <div className="flex justify-start items-center pl-4 w-full h-12">
            <div className="rounded-sm p-[1.1px] bg-link-button-54">
              <div className="p-0.5 px-2 rounded-sm bg-theme-50">
                <p className="text-theme-300">{data?.waitingBetSeconds}</p>
              </div>
            </div>
            <div className="pl-4 font-bold tracking-[0.15rem]">
              {data?.name}
            </div>
          </div>
          <div className="flex flex-grow flex-shrink-0 justify-start items-center px-3 w-full">
            <div className="w-3/4 h-full bg-gray-100 rounded-tl-sm rounded-bl-sm"></div>
            <div className="overflow-hidden w-1/4 bg-gray-100 rounded-tr-sm rounded-br-sm border-l-2 border-l-theme-50/50 h-[180px]">
              <img
                src={girl?.avatar}
                alt="Dealer avatar"
                className="object-fill object-top w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between px-3 w-full h-12 ">
            <div className="flex justify-between items-center w-1/2 h-full text-white font-light text-lg">
              <div className="inline-flex items-center">
                <div className="py-0.5 px-1.5 rounded-full bg-grid-100">
                  <FormattedMessage
                    id="common.dealer"
                    defaultMessage="B"
                  />
                </div>
                <p>{data?.roads.dealer_count}</p>
              </div>

              <div className="inline-flex items-center">
                <div className="py-0.5 px-1.5 rounded-full bg-grid-400">
                  <FormattedMessage
                    id="common.player"
                    defaultMessage="B"
                  />
                </div>
                <p>{data?.roads.player_count}</p>
              </div>
              <div className="inline-flex items-center">
                <div className="py-0.5 px-1.5 rounded-full bg-grid-200">
                  <FormattedMessage
                    id="common.tie"
                    defaultMessage="B"
                  />
                </div>
                <p>{data?.roads.tie_count}</p>
              </div>

            </div>
            <div className="flex w-1/4">
              <button className="p-1 m-auto w-full font-medium text-gray-800 bg-gradient-to-r rounded-full hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200 hover:from-theme-400 hover:to-theme-400">
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
