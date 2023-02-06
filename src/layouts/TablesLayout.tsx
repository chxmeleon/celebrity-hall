import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet } from 'react-router-dom'

const TablesLayout = () => {
  return (
    <RoomDataProvider>
      <Outlet />
    </RoomDataProvider>
  )
}

export default TablesLayout
