import { RoomDataProvider } from '@/contexts/RoomDataContext'
import { Outlet } from 'react-router-dom'

const TablesLayout = () => {
  return (
    <RoomDataProvider type='all'>
      <Outlet />
    </RoomDataProvider>
  )
}

export default TablesLayout
