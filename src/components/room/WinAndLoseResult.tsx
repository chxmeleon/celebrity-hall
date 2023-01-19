import { FormattedMessage } from 'react-intl'
import { useContext, useEffect, useState } from 'react'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'

const winLoseStyle = {
  isLose: 'bg-red-700/95 text-red-200',
  isWin: 'bg-theme-300/95 text-theme-50',
  isTie: 'bg-green-400/95 text-teal-900'
}

type NoticeProps = {
  gameState: string | any
}

const WinAndLoseResult: React.FC<NoticeProps> = ({ gameState }) => {
  const { notice } = useContext(GamePlayContext)
  const windLoseState = () => {
    if (Math.floor(Number(notice?.winLossAmount)) < 0) {
      return 'isLose'
    } else if (Math.floor(Number(notice?.winLossAmount)) === 0) {
      return 'isTie'
    } else {
      return 'isWin'
    }
  }

  const [isShow, setIsShow] = useState(false)
  const [newNotice, setNewNotice] = useState<any | null>(null)

  useEffect(() => {
    if (gameState === 'START_BET' && newNotice !== notice) {
      setNewNotice(notice)
      setIsShow(true)
    }

    setTimeout(() => {
      setIsShow(false)
    }, 7000)
  }, [gameState, newNotice, notice])

  const noticeStyle = cx(
    'flex w-2/3 h-9 rounded-md transition-all duration-300 ease-in-out ',
    winLoseStyle[windLoseState()],
    isShow ? 'opacity-100' : 'opacity-0 -translate-y-10'
  )

  return (
    <div className={noticeStyle}>
      <div className="flex justify-around items-center m-auto w-full font-medium">
        <p>{newNotice?.roomName}</p>
        <div className="flex">
          <FormattedMessage
            id="components.betRecords.balanceLeft"
            defaultMessage="winLoss"
          />
          <span>:</span>
          <p className="pl-1">{Math.floor(Number(newNotice?.balance))}</p>
        </div>
        <div className="flex">
          <FormattedMessage
            id="components.betRecords.winLoss"
            defaultMessage="winLoss"
          />
          <span>:</span>
          <p className="pl-1">{Math.floor(Number(newNotice?.winLossAmount))}</p>
        </div>
      </div>
    </div>
  )
}

export default WinAndLoseResult
