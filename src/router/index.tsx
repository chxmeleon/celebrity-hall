import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import List from '@/pages/List'
import Rooms from '@/pages/Rooms'
import Room from '@/pages/Rooms/[id]'
import Streamers from '@/pages/Streamers'
import Streamer from '@/pages/Streamers/[id]'
import Girls from '@/pages/Girls'
import Profile from '@/pages/Profile'
import Rankings from '@/pages/Rankings'


const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/streamers" element={<Streamers />} />
        <Route path="/streamers/:id" element={<Streamer />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/lists" element={<List />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
