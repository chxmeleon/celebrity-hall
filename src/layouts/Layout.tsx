import React from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import Header from './Header'
import LeftSidebar from './LeftSidebar'

// type LayoutProps = {
//   children: React.ReactNode
// }

const Layout: React.FC = () => {
  const location = useLocation()
  const isLoginPath = location.pathname === '/login'
  const bgImage = cx(
    `${isLoginPath ? 'bg-fixed bg-center bg-cover' : 'bg-left-bottom bg-auto'}
     fixed top-0 left-0 w-full h-screen bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
     before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`
  )

  const outlet = useOutlet()
  return (
    <main>
      <div className="relative">
        <div className={bgImage}></div>
      </div>
      <section className="w-full h-screen">
        {isLoginPath ? (
          <>{outlet}</>
        ) : (
          <>
            <Header />
            <div className="flex justify-start pt-12 h-full">
              <LeftSidebar />
              <div className="relative w-full bg-black">{outlet}</div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Layout
