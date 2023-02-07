import { clsx as cx } from 'clsx'
import { PropsWithChildren } from 'react'
import LogoImg from '/login_logo.webp'
import BgImg from '/login_bg.avif'
import { FormattedMessage } from 'react-intl'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'


export const Progress: React.FC<PropsWithChildren> = ({ children }) => {
  const { isTablesPath } = useContext(RoomDataContext)
  const countDownStyle = cx(
    'border-theme-300 w-[82%] h-[82%] rounded-full absolute  border-b-transparent brightness-125 blur-[1px] inset-0 m-auto transition-all duration-150 ease-in-out countdown-progress',
    isTablesPath ? 'border-t-[0.5px] border-r-[2px]' : 'border-t-[1px] border-r-[3px] md:border-t-[3px] md:border-r-[6px]' 
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

const Loading: React.FC = () => {
  const { isTablesPath } = useContext(RoomDataContext)
  return (
    <div className="flex absolute z-30 flex-col w-full h-full">
      <div className="absolute overflow-hidden w-full h-full">
        <img src={BgImg} alt="bg image"  className="w-full h-full object-cover" />
      </div>
      <div className={cx("m-auto ", isTablesPath ? 'w-28 h-28' : 'md:w-48 md:h-48 w-32 h-32' )}>
        <Progress>
          <div className="flex flex-col justify-center items-center">
            <div className={cx(isTablesPath ? "w-8" :"md:w-20 md:h-20 w-12 h-12")}>
              <img
                src={LogoImg}
                alt="logo image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className={cx("text-theme-300", isTablesPath ? 'text-[11px]' : 'text-sm md:text-xl' )}>
              <FormattedMessage id="streams.loading" defaultMessage="Loading" />
            </div>
          </div>
        </Progress>
      </div>
    </div>
  )
}

export default Loading
