import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import FlipCard from './FlipCard'
import { useParams } from 'react-router-dom'
import { PokerStateProps, usePokerUpdate } from '@/hooks/poker'

type cardsMapperProps = {
  [key: string]: {
    contentId: string
    default: string
    className: string
    side: string
  }
}

const cardsMapper: cardsMapperProps = {
  dealer: {
    contentId: 'common.simpleDealer',
    default: 'Dealer',
    className: 'bg-grid-100',
    side: 'rounded-r-xl'
  },
  player: {
    contentId: 'common.simplePlayer',
    default: 'Player',
    className: 'bg-grid-400',
    side: 'rounded-l-xl'
  }
}

interface CardProps {
  role: string
  roomId: string | undefined
  isTable?: boolean
}

const CardWidget: React.FC<CardProps> = ({ role, roomId, isTable }) => {
  const { currentGameState } = usePokerUpdate(roomId)
  const { pokerState: pokerState } = currentGameState
  const isWin = pokerState?.result?.[`${role}Win`]

  const titleStyle = cx(
    'flex justify-center items-center font-medium text-gray-50 rounded-full',
    cardsMapper[role].className,
    isTable ? ' w-7 h-7' : 'text-lg w-8 h-8'
  )

  const pokerContainer = cx(
    'flex flex-col items-center py-1 px-2 w-full h-full border-2',
    isWin
      ? 'border-theme-300 bg-theme-300/20 win-shadow'
      : 'border-transparent',
    cardsMapper[role].side
  )

  const winResultImg = cx(
    'flex flex-shrink-0 justify-evenly items-center px-2 pb-1 w-full h-1/6 text-2xl font-medium text-[#eddc6a] transition-all duration-300 ease-in-out',
    isWin ? '' : 'opacity-0'
  )

  return (
    <div className={pokerContainer}>
      <div className="flex justify-between items-center px-2 h-1/4 md:px-0 md:w-1/2">
        <div className={titleStyle}>
          <FormattedMessage
            id={cardsMapper[role]?.contentId}
            defaultMessage={cardsMapper[role]?.default}
          />
        </div>
        <div className="flex pl-5 text-center text-gray-50">
          <p className={cx(isTable ? 'text-2xl' : 'text-3xl')}>
            {pokerState?.[`${role}Points`] ?? 0}
          </p>
        </div>
      </div>
      <FlipCard data={pokerState?.[`${role}Cards`]} isTable={isTable} />
      <div className={winResultImg}>
        <img src="/win.svg" alt="win image" />
        <FormattedMessage id="common.win" defaultMessage="Win" />
      </div>
    </div>
  )
}

export default CardWidget
