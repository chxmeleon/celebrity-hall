import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { GameStateProvider } from '@/contexts/GameStateContext'
import { Outlet } from 'react-router-dom'

const RoomsLayout: React.FC = () => {
  return (
    <GameStateProvider>
      <GamePlayProvider>
        <Outlet />
      </GamePlayProvider>
    </GameStateProvider>
  )
}

export default RoomsLayout
