import CardWidget from './CardWidget'
import { usePockerUpdate } from '@/hooks/pocker'
import { useParams } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import { useEffect, useState } from 'react'

const PockerResult: React.FC = () => {
  const { id } = useParams()
  const { currentGameState } = usePockerUpdate(id)
  const { pockerState, gameState } = currentGameState
  const [isShowPocker, setIsShowPocker] = useState(false)

  useEffect(() => {
    if (
      gameState !== 'START_BET' &&
      gameState !== 'STOP_BET' &&
      gameState !== 'UPDATE_AMOUNT' &&
      gameState !== 'SHUFFLE'
    ) {
      setIsShowPocker(true)
    } else {
      setIsShowPocker(false)
    }
  }, [gameState])
  
  
  const resultContainerStyle = cx(
    'transition-opacity duration-300 ease-in flex w-full h-full rounded-xl border bg-theme-50/80 backdrop-blur-sm border-theme-150',
    isShowPocker ? '' : 'opacity-0',
    pockerState?.result?.tieWin ? 'tie-win outline outline-2 outline-theme-300' : ''
  )

  return (
    <div className={resultContainerStyle}>
      <CardWidget role="player" />
      <div className="w-1 h-full bg-theme-150"></div>
      <CardWidget role="dealer" />
    </div>
  )
}

export default PockerResult
