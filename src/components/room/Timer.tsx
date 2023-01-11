import { GET_CURRENT_COUNTDOWN } from '@/gql/stream'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clsx as cx } from 'clsx'

const Timer: React.FC = () => {
  const roomId = useParams()
  const { data } = useQuery(GET_CURRENT_COUNTDOWN, {
    variables: { baccaratRoomId: Number(roomId?.id) }
  })

  const [counter, setCounter] = useState(25)
  const startCount =
    data?.baccaratRoom?.currentGame.status === 'opening'
  const isLeftTen = counter < 11
  const countDownStyle = cx(
    'w-[84%] h-[84%] rounded-full absolute border-[6px] border-l-transparent border-t-transparent inset-0 m-auto transition-all ease-in-out countdown-progress',
    isLeftTen ? 'border-[#ff0015]' : 'border-theme-300'
  )

  useEffect(() => {
    startCount &&
      counter >= 0 &&
      setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter, startCount])

  return (
    <div
      className={`${startCount && counter >= 0 ? '' : 'hidden'
        } flex relative w-full h-full`}
    >
      <div className="flex relative m-auto w-full h-full rounded-full bg-theme-50/80 backdrop-blur-sm">
        <div className={countDownStyle}></div>
        <div
          className={`flex justify-center items-center m-auto w-[80%] h-[80%] rounded-full border ${isLeftTen ? 'border-[#ff0015]' : 'border-theme-300'
            }`}
        >
          <p
            className={`text-5xl ${isLeftTen ? 'text-[#ff0015]' : 'text-theme-300'
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
