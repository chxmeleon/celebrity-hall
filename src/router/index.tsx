import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from '../pages/Login'
import List from '../pages/List'
import Rooms from '../pages/Rooms/index'
import Room from '../pages/Rooms/[id]'
import Streamers from '../pages/Streamers'
import Streamer from '../pages/Streamers/[id]'
import Girls from '../pages/Girls'
import Profile from '../pages/Profile'

const Router: React.FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Rooms />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/streamers" element={<Streamers />} />
          <Route path="/streamers/:id" element={<Streamer />} />
          <Route path="/girls" element={<Girls />} />
          <Route path="/lists" element={<List />} />
          <Route path="/rankings" element={<List />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default Router
