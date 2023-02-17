import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import { useAuth } from '@/contexts/AuthContext'
import SetupModal from '@/components/setup/SetupModal'
import NoticeModal from '@/components/setup/NoticeModal'
import { NavbarBottom, NavbarTop } from './navbar'

const ProtectedLayout: React.FC = () => {
  const { auth, isExpired } = useAuth()
  if (!auth || isExpired) {
    return <Navigate to="/login" replace />
  }

  const bgImage = cx`bg-left-bottom bg-auto
     absolute top-0 w-full h-full aspect-video bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
     before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`



  return (
    <main className="relative w-full h-full">
      <SetupModal />
      <NoticeModal />
      <section className="relative m-auto w-full h-full border border-theme-70">
        <div className={bgImage}></div>
        <Header />
        <NavbarTop />
        <div className="flex justify-start w-full h-[76%] pt-0 md:pt-9 md:h-full">
          <LeftSidebar />
          <Outlet />
        </div>
        <NavbarBottom />
      </section>
    </main>
  )
}

export default ProtectedLayout
