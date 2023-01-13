import { GET_CURRENT_COUNTDOWN } from '@/gql/baccaratrooms'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { clsx as cx } from 'clsx'
import types from '@/types'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import { useActionCable } from '@/contexts/ActionCableContext'

const Timer: React.FC = () => {
  const roomId = useParams()
  const { data, refetch } = useQuery<
    types.GET_CURRENT_COUNTDOWN,
    types.GET_CURRENT_COUNTDOWNVariables
  >(GET_CURRENT_COUNTDOWN, {
    variables: { baccaratRoomId: roomId?.id ?? '' }
  })

  const [gameState, setGameState] = useState<any | null>(null)
  const { cable } = useActionCable()
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId.id },
      {
        received: (data: any) => {
          setGameState(data)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])
  /* console.log(gameState); */

  const [counter, setCounter] = useState<number | undefined>()
  const startCount =
    data?.baccaratRoom?.currentGame?.status === 'waiting_for_bet' || gameState?.command === 'START_BET'  

  const isLeftTen = counter !== undefined && counter < 11
  const countDownStyle = cx(
    'w-[82%] h-[82%] rounded-full absolute border-t-[7px] border-r-[2px] border-transparent inset-0 m-auto transition-all duration-150 ease-in-out countdown-progress',
    isLeftTen ? 'border-t-[#ff0015]' : 'border-t-theme-300'
  )

  const streamLatency = useContext(StreamLatencyContext)
  useEffect(() => {
    const isCountDownStarted = gameState?.command === 'START_BET'
    if (data?.baccaratRoom?.currentGame && isCountDownStarted) {
      const { latency } = data.baccaratRoom
      const endAt = new Date(gameState?.data?.endAt)
      /* console.log(gameState?.data?.endAt); */
      /* console.log(endAt) */
      const timeLeft = Math.floor(
        (endAt.getTime() - Date.now()) / 1000 + (latency ?? 0) - streamLatency - 7  
      )

      setCounter(timeLeft)
    }
  }, [counter, data, streamLatency, gameState])

  
  useEffect(() => {
    let timeout: number | null = null
    if (counter !== undefined && counter >= 0) {
      timeout = window.setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [counter])

  return (
    <div
      className={`${
        startCount && counter !== undefined && counter >= 0 ? '' : 'hidden'
      } flex relative w-full h-full`}
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
