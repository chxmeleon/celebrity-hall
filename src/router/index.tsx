import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import Rooms from '@/pages/Rooms'
import Room from '@/pages/Rooms/[id]'
import Streamers from '@/pages/Streamers'
import Streamer from '@/pages/Streamers/[id]'
import Profile from '@/pages/Profile'
import Rankings from '@/pages/Rankings'
import Layout from '@/layouts/Layout'
import Tables from '@/pages/Tables'


const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="home" element={<Layout />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="liverooms" element={<Rooms />} />
          <Route path="mutualrooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<Room />} />
          <Route path="streamers" element={<Streamers />} />
          <Route path="streamers/:id" element={<Streamer />} />
          <Route path="tables" element={<Tables />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Router
