import heart from '@/assets/rankings/heart.png'
import { FormattedMessage } from 'react-intl'

const Win: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="flex items-center sm:mr-[32px] mr-[10px]">
      <span className="rounded-full bg-[#FF5F85] w-[25px] h-[25px] flex">
        <div className="m-auto text-[14px]">
          <FormattedMessage id="streamers.win" defaultMessage="勝" />
        </div>
      </span>
      <span className="sm:ml-[10px] ml-[5px] text-[16px]">
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
      <span className="sm:ml-[10px] ml-[5px] text-[16px]">{like}</span>
    </div>
  )
}

export const StreamersCard: React.FC<{ data: Array<any> }> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="sm:mr-[40px] sm:mb-[55px] mb-[35px] relative"
        >
          {item.online && (
            <div className="absolute bg-[#FF0A18] w-[53px] h-[20px] text-[13px] text-center right-[12px] top-[12px]">
              <div>● Live</div>
            </div>
          )}
          <img
            className="sm:w-[401px] sm:h-[355px] w-[278px] h-[246px] object-contain"
            src={item.avatar}
          />
          <div className="flex items-center justify-between">
            <div className="sm:text-[32px] text-[24px]">{item.nickname}</div>
            <div className="flex">
              <Win percent={item.winRate} />
              <Heart like={item.likesCount} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}