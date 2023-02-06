import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet } from 'react-router-dom'

const RoomsLayout: React.FC<{ isTable: boolean }> = ({ isTable }) => {
  return (
    <RoomDataProvider>
      {isTable ? (
        <Outlet />
      ) : (
        <GamePlayProvider>
          <Outlet />
        </GamePlayProvider>
      )}
    </RoomDataProvider>
  )
}

export default RoomsLayout
