import { Navigate, Outlet } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import { useAuth } from '@/hooks/useAuth'
import Modal from '@/components/Modal'

const ProtectedLayout: React.FC = () => {
  const { auth } = useAuth()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  const bgImage = cx`bg-left-bottom bg-auto
     fixed top-0 left-0 w-full h-screen bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
     before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`

  return (
    <main>
      <Modal />
      <div className="relative">
        <div className={bgImage}></div>
      </div>
      <section className="w-full h-screen">
        <Header />
        <div className="flex justify-start pt-12 h-full">
          <LeftSidebar />
          <div className="relative w-full bg-black">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProtectedLayout
