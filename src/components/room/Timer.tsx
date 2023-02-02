import { clsx as cx } from 'clsx'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import { useActionCable } from '@/contexts/ActionCableContext'
import { useTimeLeft } from '@/hooks/rooms'
import { useContext } from 'react'
import GameStateContext from '@/contexts/GameStateContext'

const Timer: React.FC<{ roomId: string }> = ({ roomId }) => {
  const { counter, isLeftTen, startCount } = useTimeLeft(roomId ?? '')
  const { isTable } = useContext(GameStateContext)
  const countDownStyle = cx(
    'w-[82%] h-[82%] rounded-full absolute  border-b-transparent brightness-125 blur-[1px] inset-0 m-auto transition-all duration-150 ease-in-out countdown-progress',
    isLeftTen ? 'border-[#ff0015] ' : 'border-theme-300 ',
    isTable ? 'border-r-[2.2px]' : 'border-t-[1px] border-r-[3px] md:border-t-[3px] md:border-r-[6px]' 
  )

  return (
    <div
      className={`${
        startCount && counter !== undefined && counter > 0 ? '' : 'opacity-0'
      } flex relative w-full h-full duration-300 ease-in-out transition-opacity`}
    >
      <div className="flex relative m-auto w-full h-full rounded-full bg-theme-50/80 backdrop-blur-sm">
        <div className={countDownStyle}></div>
        <div
          className={cx('flex justify-center items-center m-auto w-[80%] h-[80%] rounded-full border', 
            isLeftTen ? 'border-[#ff0015]' : 'border-theme-300',
          )}
        >
          <p
            className={cx(
              'font-medium ',
              isLeftTen ? 'text-[#ff0015]' : 'text-theme-300',
              isTable ? 'text-[20px]' : 'md:text-[50px] text-2xl'
            )}
          >
            {counter}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Timer
