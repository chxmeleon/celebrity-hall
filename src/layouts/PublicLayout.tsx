import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import SetupModal from '@/components/setup/SetupModal'
import AuthAlert from '@/components/auth/AuthAlert'

const PublicLayout: React.FC = () => {
  useEffect(() => {
    const mainElement = document.getElementById('public-page')
    const script = document.createElement('script')
    script.src = 'https://ssl.captcha.qq.com/TCaptcha.js'
    script.async = true

    mainElement?.appendChild(script)
    return () => {
      mainElement?.removeChild(script)
    }
  }, [])

  const bgImage = cx`
    bg-fixed bg-center bg-cover
    fixed top-0 left-0 w-full h-full bg-no-repeat z-[-1] bg-[url('../assets/login_bg.avif')] 
    before:absolute before:w-full before:h-full before:bg-black/20 before:content-['']`

  return (
    <main id="public-page">
      <SetupModal />
      <AuthAlert />
      <div className="relative w-full">
        <div className={bgImage}></div>
      </div>
      <section className="w-full h-screen">
        <Outlet />
      </section>
    </main>
  )
}

export default PublicLayout
