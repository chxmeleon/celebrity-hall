import { Dispatch, SetStateAction } from 'react'
import heart from '@/assets/rankings/heart.png'
import { streamType } from '@/pages/Streamers/index'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import React from 'react'
import { Responsive } from '@/hooks/useResponsive'

const Win: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="flex items-center mr-[10px] sm:mr-[32px]">
      <span className="rounded-full bg-[#FF5F85] w-[25px] h-[25px] flex">
        <div className="m-auto text-[14px]">
          <FormattedMessage id="streamers.win" defaultMessage="勝" />
        </div>
      </span>
      <span className="ml-[5px] text-[16px] sm:ml-[10px]">
        {Math.round(percent * 100) / 100}%
      </span>
    </div>
  )
}

const Heart: React.FC<{ like: number }> = ({ like }) => {
  return (
    <div className="flex items-center">
      <span className="rounded-full bg-[#FF5F85] w-[25px] h-[25px] flex">
        <img
          className="m-auto w-[12.42px] h-[11.04px]"
          src={heart}
          alt="heart"
        />
      </span>
      <span className="ml-[5px] text-[16px] sm:ml-[10px]">{like}</span>
    </div>
  )
}

export const StreamersCard: React.FC<{
  item: any
  onStreamChanged: Dispatch<SetStateAction<streamType>>
}> = ({ item, onStreamChanged }) => {
  return (
    <div
      key={item.id}
      className={` relative w-full bg-link-button-54 p-[1px] ${
        item.online ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      onClick={() =>
        onStreamChanged({
          name: item.stream.name,
          key: item.stream.key
        })
      }
    >
      <div className="bg-theme-50">
        {item.online && (
          <div className="absolute z-20 bg-[#FF0A18] w-[53px] h-[20px] text-[13px] text-center right-[12px] top-[12px]">
            <div>● Live</div>
          </div>
        )}
        <div className="relative">
          {!item?.online && (
            <div className="absolute w-full h-full pointer-events-none bg-black/60"></div>
          )}
          <div className="overflow-hidden w-full h-[331px] md:w-full md:h-[351px]">
            <img
              className="object-cover object-center w-full h-full"
              src={item.avatar}
            />
          </div>
        </div>
        <div className="absolute bottom-[1px] flex justify-between items-center p-2 w-[99%] bg-theme-50/60">
          <div className="text-lg md:text-xl truncate">{item.nickname}</div>
          <div className="flex">
            <Win percent={item.winRate} />
            <Heart like={item.likesCount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const StreamersCards: React.FC<{
  data: Array<any>
  onStreamChanged: Dispatch<SetStateAction<streamType>>
}> = ({ data, onStreamChanged }) => {
  return (
    <>
      <Responsive.Default>
        <div className="flex flex-col gap-4">
          {data.map((item, idx) => (
            <Link
              key={idx}
              to={`/home/streamers/${item.id}`}
              className={!item.online ? `pointer-events-none` : ''}
            >
              <StreamersCard item={item} onStreamChanged={onStreamChanged} />
            </Link>
          ))}
        </div>
      </Responsive.Default>

      <Responsive.Desktop>
        <div className="grid grid-cols-3 auto-rows-fr gap-4 w-full h-full">
          {data.map((item, idx) => (
            <StreamersCard
              key={idx}
              item={item}
              onStreamChanged={onStreamChanged}
            />
          ))}
        </div>
      </Responsive.Desktop>
    </>
  )
}
