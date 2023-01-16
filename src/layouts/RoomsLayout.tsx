import { GameStateProvider } from '@/contexts/GameStateContext'
import { Outlet } from 'react-router-dom'

const RoomsLayout: React.FC = () => {
  return (
    <GameStateProvider>
      <Outlet />
    </GameStateProvider>
  )
}

export default RoomsLayout
