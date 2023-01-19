import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { GameStateProvider } from '@/contexts/GameStateContext'
import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet } from 'react-router-dom'

const RoomsLayout: React.FC = () => {
  return (
    <RoomDataProvider>
      <GameStateProvider>
        <GamePlayProvider>
          <Outlet />
        </GamePlayProvider>
      </GameStateProvider>
    </RoomDataProvider>
  )
}

export default RoomsLayout
