import React from 'react'
import LogoImg from '@/assets/login_logo.webp'
import LoginForm from '@/components/auth/LoginForm'
import { useSetup } from '@/contexts/SetupContext'
import AuthAlert from '@/components/auth/AuthAlert'


const Login: React.FC = () => {
  const { openSetup } = useSetup()


  return (
    <div className="relative flex justify-center items-center h-full">
      <AuthAlert />
      <div className="flex justify-center w-full">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="pb-8">
              <img src={LogoImg} alt="logo image" className="w-24" />
            </div>
            <div className="flex justify-end px-1 pb-2 w-[240px] text-2xl md:w-[25rem]">
              <button onClick={openSetup}>
                <div className="i-heroicons-cog-6-tooth-solid"></div>
              </button>
              <button className="ml-6">
                <div className="i-heroicons-arrow-top-right-on-square"></div>
              </button>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
