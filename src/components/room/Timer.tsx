import { GET_CURRENT_COUNTDOWN } from '@/gql/baccaratrooms'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { clsx as cx } from 'clsx'
import types from '@/types'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import { useActionCable } from '@/contexts/ActionCableContext'
import { useTimeLeft } from '@/hooks/rooms'

const Timer: React.FC = () => {
  const roomId = useParams()
  const {counter, isLeftTen, startCount} = useTimeLeft(roomId.id ?? '')
  const countDownStyle = cx(
    'w-[82%] h-[82%] rounded-full absolute border-t-[3px] border-r-[6px] border-b-transparent brightness-125 blur-[1px] inset-0 m-auto transition-all duration-150 ease-in-out countdown-progress',
    isLeftTen ? 'border-[#ff0015] ' : 'border-theme-300 '
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
          className={`flex justify-center items-center m-auto w-[80%] h-[80%] rounded-full border ${
            isLeftTen ? 'border-[#ff0015]' : 'border-theme-300'
          }`}
        >
          <p
            className={`text-[50px] font-medium ${
              isLeftTen ? 'text-[#ff0015]' : 'text-theme-300'
            }`}
          >
            {counter}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Timer
