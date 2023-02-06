import CardWidget from './CardWidget'
import { FormattedMessage } from 'react-intl'
import { usePokerUpdate } from '@/hooks/pocker'
import { clsx as cx } from 'clsx'
import { useContext, useEffect, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'


const PokerResult: React.FC<{ roomId: string, isTablesPath?: boolean }> = ({ roomId, isTablesPath }) => {
  const { currentGameState } = usePokerUpdate(roomId)
  const { pokerState, gameState, currentGame } = currentGameState
  const [isShowPoker, setIsShowPoker] = useState(false)
  
  
  useEffect(() => {
    if (
      gameState !== 'START_BET' &&
      gameState !== 'STOP_BET' &&
      !currentGame?.shuffle &&
      gameState !== 'UPDATE_AMOUNT' &&
      gameState !== undefined
    ) {
      setIsShowPoker(true)
    } 

    return () => {
      setIsShowPoker(false)
    }
  }, [gameState, currentGame])

  const resultContainerStyle = cx(
    'relative transition-opacity duration-300 ease-in flex w-full h-full rounded-xl border bg-theme-50/80 backdrop-blur-sm border-theme-150',
    isShowPoker ? '' : 'opacity-0',
    pokerState?.result?.tieWin
      ? 'win-shadow outline outline-2 outline-theme-300'
      : ''
  )

  return (
    <div className={resultContainerStyle}>
      <div
        className={cx(
          pokerState?.result?.tieWin ? '' : 'opacity-0',
          'text-theme-300 font-medium w-full h-full absolute top-0 left-0 flex justify-center items-center',
          isTablesPath ? 'text-3xl' : ' text-5xl'
        )}
      >
        <FormattedMessage id="common.simpleTie" defaultMessage="Tie" />
      </div>
      <CardWidget role="player" roomId={roomId} isTable={isTablesPath} />
      <div className="w-1 h-full bg-theme-150"></div>
      <CardWidget role="dealer" roomId={roomId} isTable={isTablesPath} />
    </div>
  )
}

export default PokerResult
