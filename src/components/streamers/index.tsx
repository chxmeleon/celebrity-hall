import { Dispatch, SetStateAction } from 'react'
import heart from '@/assets/rankings/heart.png'
import { streamType } from '@/pages/Streamers/index'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { Responsive, ResponsiveContext } from '@/hooks/useResponsive'

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
      className={`px-2 relative ${
        item.online ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      onClick={() =>
        onStreamChanged({
          name: item.stream.name,
          key: item.stream.key
        })
      }
    >
      {item.online && (
        <div className="absolute bg-[#FF0A18] w-[53px] h-[20px] text-[13px] text-center right-[12px] top-[12px]">
          <div>● Live</div>
        </div>
      )}
      <div className="relative">
        {!item?.online && (
          <div className="absolute w-full h-full bg-black/60 pointer-events-none"></div>
        )}
        <img
          className="object-cover object-center w-[278px] h-[246px] sm:w-[401px] sm:h-[355px]"
          src={item.avatar}
        />
      </div>
      <div className="flex justify-between items-center py-1 px-4">
        <div className="text-[24px] sm:text-[32px]">{item.nickname}</div>
        <div className="flex">
          <Win percent={item.winRate} />
          <Heart like={item.likesCount} />
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
        {data.map((item, idx) => (
          <Link
            key={idx}
            to={`/home/streamers/${item.id}`}
            className={!item.online ? `pointer-events-none` : ''}
          >
            <StreamersCard item={item} onStreamChanged={onStreamChanged} />
          </Link>
        ))}
      </Responsive.Default>

      <Responsive.Desktop>
        {data.map((item, idx) => (
          <StreamersCard
            key={idx}
            item={item}
            onStreamChanged={onStreamChanged}
          />
        ))}
      </Responsive.Desktop>
    </>
  )
}
