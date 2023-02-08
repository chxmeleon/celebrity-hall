import { GamePlayProvider } from '@/contexts/GamePlayContext'
import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet, useParams } from 'react-router-dom'

const RoomsLayout = () => {
  const { type } = useParams<{ type: string | undefined }>()
  

  return (
    <RoomDataProvider type={type}>
      <GamePlayProvider>
        <Outlet />
      </GamePlayProvider>
    </RoomDataProvider>
  )
}

export default RoomsLayout
