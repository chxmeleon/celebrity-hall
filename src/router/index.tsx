import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Rooms from '@/pages/Rooms'
import Room from '@/pages/Rooms/[id]'
import Streamers from '@/pages/Streamers'
import Streamer from '@/pages/Streamers/[id]'
import Profile from '@/pages/Profile'
import Rankings from '@/pages/Rankings'
import PublicLayout from '@/layouts/PublicLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import RoomsLayout from '@/layouts/RoomsLayout'
import Tables from '@/pages/Tables'
import Liverooms from '@/pages/Liverooms'
import Mutualrooms from '@/pages/Mutualrooms'
import Following from '@/pages/Following'
import UserRanking from '@/pages/UserRanking'
import ProtectedLayoutForRoom from '@/layouts/ProtectedLayoutForRoom'
import Rule from '@/pages/Rule'
import TablesLayout from '@/layouts/TablesLayout'


const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="home" element={<ProtectedLayoutForRoom />}>
        <Route element={<RoomsLayout />}>
          <Route path="rooms/:id" element={<Room />} />
          <Route path="profile" element={<Profile />} />
          <Route path="intro-rule" element={<Rule />} />
        </Route>
      </Route>
      <Route path="home" element={<ProtectedLayout />}>
        <Route element={<TablesLayout />}>
          <Route path="tables" element={<Tables />} />
        </Route>
        <Route element={<RoomsLayout />}>
          <Route index element={<Navigate to="rooms" replace />} />
          <Route path="liverooms" element={<Liverooms />} />
          <Route path="mutualrooms" element={<Mutualrooms />} />
          <Route path="rooms" element={<Rooms />} />
        </Route>
        <Route path="streamers" element={<Streamers />} />
        <Route path="streamers/:id" element={<Streamer />} />
        <Route path="following" element={<Following />} />
        <Route path="rankings/streamers" element={<Rankings />} />
        <Route
          path="rankings/contribution"
          element={<UserRanking type="contribution" />}
        />
        <Route
          path="rankings/win-points"
          element={<UserRanking type="win_points" />}
        />
        <Route
          path="rankings/rounds-leaderboard"
          element={<UserRanking type="rounds" />}
        />
      </Route>
    </Routes>
  )
}

export default Router
