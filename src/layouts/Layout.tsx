import React from 'react'
import LeftSidebar from './LeftSidebar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const isAuthorized = false 

  return (
    <>
      {isAuthorized ? (
        <section className="w-full h-screen">
          <div className="flex items-center">
            <LeftSidebar />
            <div>{children}</div>
          </div>
        </section>
      ) : (
        <section className="w-full h-screen">{children}</section>
      )}
    </>
  )
}

export default Layout
