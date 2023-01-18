import { FormattedMessage } from 'react-intl'
import { useCurrentGameState } from '@/hooks/rooms'
import { useContext, useEffect, useState } from 'react'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'
import { useParams } from 'react-router-dom'

const WinAndLoseResult = () => {
  const roomId = useParams()
  const { currentGameState } = useCurrentGameState(roomId.id)
  const { gameState } = currentGameState
  const { notice } = useContext(GamePlayContext)
  const isLose = Math.floor(Number(notice?.winLossAmount)) < 0
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (gameState === 'CLOSE' && notice !== undefined) {
      setIsShow(true)
    }
  }, [gameState, notice])

  const noticeStyle = cx(
    'flex w-2/3 h-9 rounded-md transition-all duration-150 ease-in-out ',
    isLose ? 'bg-red-400/95 text-red-900' : 'bg-theme-300/95 text-theme-50',
    isShow ? '' : 'opacity-0'
  )

  return (
    <>
      {isShow ? (
        <div className={noticeStyle}>
          <div className="flex justify-around items-center m-auto w-full font-medium">
            <p>{notice?.roomName}</p>
            <div className="flex">
              <FormattedMessage
                id="components.betRecords.balanceLeft"
                defaultMessage="winLoss"
              />
              <span>:</span>
              <p className="pl-1">{Math.floor(Number(notice?.balance))}</p>
            </div>
            <div className="flex">
              <FormattedMessage
                id="components.betRecords.winLoss"
                defaultMessage="winLoss"
              />
              <span>:</span>
              <p className="pl-1">
                {Math.floor(Number(notice?.winLossAmount))}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default WinAndLoseResult
