import React from 'react'
import LogoImg from '@/assets/login_logo.webp'
import LoginForm from '@/components/LoginForm'

type LoginProps = {
  openModal: React.MouseEventHandler<HTMLButtonElement>
}

const Login: React.FC<LoginProps> = (props) => {
  const { openModal } = props

  return (
    <div>
      <div className="flex justify-center pt-28 w-full">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div>
              <img src={LogoImg} alt="logo image" className="w-24" />
            </div>
            <div className="py-10">
              <p>Login</p>
            </div>
            <div className="flex justify-end px-1 text-2xl w-[25rem]">
              <button onClick={openModal}>
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
