import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet } from 'react-router-dom'

const RoomsLayout = () => {
  return (
    <RoomDataProvider>
      <GamePlayProvider>
        <Outlet />
      </GamePlayProvider>
    </RoomDataProvider>
  )
}

export default RoomsLayout
