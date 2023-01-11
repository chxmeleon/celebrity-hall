import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { useEffect, useState } from 'react'
import { useCurrentGameState } from '@/hooks/rooms'
import FlipCard from './FlipCard'

type cardsMapperProps = {
  dealer: {
    contentId: string
    default: string
    className: string
  }
  player: {
    contentId: string
    default: string
    className: string
  }
}

const cardsMapper: any = {
  dealer: {
    contentId: 'common.dealer',
    default: 'Dealer',
    className: 'bg-grid-100',
    side: 'rounded-r-xl'
  },
  player: {
    contentId: 'common.player',
    default: 'Player',
    className: 'bg-grid-400',
    side: 'rounded-l-xl'
  }
}

interface CardProps {
  role: string
  open: boolean
  /* isWin: boolean */
  /* isTie: boolean */
}

const CardWidget: React.FC<CardProps> = ({ role, open = true }) => {
  const { currentGameState } = useCurrentGameState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const isWin = currentGameState?.[`${role}Win`]

  const titleStyle = cx(
    'flex justify-center items-center w-8 h-8 text-lg font-medium text-gray-50 rounded-full',
    cardsMapper[role].className
  )

  const pockerContainer = cx(
    'flex flex-col items-center py-1 px-2 w-full h-full  border-2',
    isWin ? 'border-theme-300 bg-theme-300/20' : 'border-transparent',
    cardsMapper[role].side
  )

  const winResultImg = cx(
    'flex flex-shrink-0 justify-evenly items-center px-4 w-full h-1/6 text-2xl font-medium text-[#eddc6a] transition-all duration-300 ease-in-out',
    isWin ? '' : 'opacity-0'
  )

  return (
    <div className={pockerContainer}>
      <div className="flex justify-center items-center w-full h-1/4">
        <div className={titleStyle}>
          <FormattedMessage
            id={cardsMapper[role]?.contentId}
            defaultMessage={cardsMapper[role]?.default}
          />
        </div>
        <div className="flex pl-3 text-center text-gray-50">
          <p>{currentGameState?.[`${role}Points`]}</p>
        </div>
      </div>
      <FlipCard data={currentGameState?.[`${role}Cards`]} isOpen={isOpen} />
      <div className={winResultImg}>
        <img src="/win.svg" alt="win image" />
        <FormattedMessage id="common.win" defaultMessage="Win" />
      </div>
    </div>
  )
}

export default CardWidget
