import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import Rooms from '@/pages/Rooms'
import Room from '@/pages/Rooms/[id]'
import Streamers from '@/pages/Streamers'
import Streamer from '@/pages/Streamers/[id]'
import Profile from '@/pages/Profile'
import Rankings from '@/pages/Rankings'
import Layout from '@/layouts/Layout'
import Tables from '@/pages/Tables'
import Liverooms from '@/pages/Liverooms'
import Mutualrooms from '@/pages/Mutualrooms'
import Following from '@/pages/Following'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="home" element={<Layout />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="liverooms" element={<Liverooms />} />
          <Route path="mutualrooms" element={<Mutualrooms />} />
          <Route path="rooms/:id" element={<Room />} />
          <Route path="streamers" element={<Streamers />} />
          <Route path="streamers/:id" element={<Streamer />} />
          <Route path="tables" element={<Tables />} />
          <Route path="following" element={<Following />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
