import { clsx as cx } from 'clsx'
import { PropsWithChildren, useMemo } from 'react'
import LogoImg from '/login_logo.webp'
import BgImg from '/login_bg.avif'
import { FormattedMessage } from 'react-intl'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'

export const Progress: React.FC<
  PropsWithChildren<{ size?: 'default' | 'small' }>
> = ({ children, size }) => {
  const countDownStyle = cx(
    'border-theme-300 w-[82%] h-[82%] rounded-full absolute  border-b-transparent brightness-125 blur-[1px] inset-0 m-auto transition-all duration-150 ease-in-out countdown-progress',
    size == 'small'
      ? 'border-t-[0.5px] border-r-[2px]'
      : 'border-t-[1px] border-r-[3px] md:border-t-[3px] md:border-r-[6px]'
  )
  return (
    <div className="flex relative m-auto w-full h-full rounded-full bg-theme-50/80 backdrop-blur-sm">
      <div className={countDownStyle}></div>
      <div className="flex justify-center items-center m-auto w-[80%] h-[80%] rounded-full border border-theme-300">
        {children}
      </div>
    </div>
  )
}

const Loading: React.FC<{
  size?: 'default' | 'small'
  type?: 'default' | 'fixed'
}> = ({ size, type }) => {
  const loadingBgImg = useMemo(() => BgImg, [])
  return (
    <div className="flex relative z-30 flex-col w-full h-full">
      <div className="overflow-hidden absolute w-full h-full">
        <img
          src={loadingBgImg}
          alt="bg image"
          className="object-cover w-full h-full"
        />
      </div>
      <div
        className={cx(
          'm-auto ',
          size === 'small' ? 'w-28 h-28' : 'md:w-48 md:h-48 w-32 h-32'
        )}
      >
        <Progress>
          <div className="flex flex-col justify-center items-center">
            <div
              className={cx(
                size === 'small' ? 'w-8' : 'md:w-20 md:h-20 w-12 h-12'
              )}
            >
              <img
                src={LogoImg}
                alt="logo image"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className={cx(
                'text-theme-300 py-0.5 font-bold',
                size === 'small' ? 'text-[11px]' : 'text-sm md:text-xl'
              )}
            >
              {type === 'fixed' ? (
                <FormattedMessage
                  id="stream.maintain"
                  defaultMessage="Maintaining"
                />
              ) : (
                <FormattedMessage
                  id="streams.loading"
                  defaultMessage="Loading"
                />
              )}
            </div>
          </div>
        </Progress>
      </div>
    </div>
  )
}

export default Loading
