import React from 'react'
import { Outlet } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import Modal from '@/components/Modal'

const PublicLayout: React.FC = () => {
  const bgImage = cx`
    bg-fixed bg-center bg-cover
    fixed top-0 left-0 w-full h-screen bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
    before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`

  return (
    <main>
      <Modal />
      <div className="relative">
        <div className={bgImage}></div>
      </div>
      <section className="w-full h-screen">
        <Outlet />
      </section>
    </main>
  )
}

export default PublicLayout
