import { Navigate, Outlet } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import { useAuth } from '@/contexts/AuthContext'
import SetupModal from '@/components/setup/SetupModal'
import NoticeModal from '@/components/setup/NoticeModal'
import { useActivedTab } from '@/hooks/rooms'

const ProtectedLayout: React.FC = () => {
  const { auth, isExpired } = useAuth()
  if (!auth || isExpired ) {
    return <Navigate to="/login" replace />
  }

  const bgImage = cx`bg-left-bottom bg-auto
     absolute top-0 w-full h-full aspect-video bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
     before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`

  return (
    <main className="w-full h-full">
      <SetupModal />
      <NoticeModal />
      <section className="relative m-auto w-full md:w-auto h-screen aspect-video border-theme-70 border-x">
        <div className={bgImage}></div>
        <Header />
        <div className="flex justify-start pt-12 w-full h-full">
          <LeftSidebar />
          <div className="relative w-full h-full bg-black">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProtectedLayout
