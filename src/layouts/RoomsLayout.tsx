import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet, useLocation } from 'react-router-dom'

const RoomsLayout: React.FC = () => {
  const location = useLocation()
  const isTable = location.pathname === '/home/tables'
  return (
    <>
      {isTable ? (
        <RoomDataProvider>
          <Outlet />
        </RoomDataProvider>
      ) : (
        <RoomDataProvider>
          <GamePlayProvider>
            <Outlet />
          </GamePlayProvider>
        </RoomDataProvider>
      )}
    </>
  )
}

export default RoomsLayout
