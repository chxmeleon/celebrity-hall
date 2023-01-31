import React from 'react'
import LogoImg from '@/assets/login_logo.webp'
import LoginForm from '@/components/auth/LoginForm'
import { useSetup } from '@/contexts/SetupContext'
import AuthAlert from '@/components/auth/AuthAlert'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/modal'

const Login: React.FC = () => {
  const { openSetup } = useSetup()
  const { isShow, onOpenModal, onCloseModal } = useModal()

  return (
    <div className="flex relative justify-center items-center w-full h-full">
      <AuthAlert />
      <Modal
        isShow={isShow}
        onClose={onCloseModal}
        size="w-full md:w-1/3 h-1/3"
      >
        <div className="flex h-[69%]">
          <div className="inline-flex justify-evenly items-center m-auto w-2/3">
            <a href="/" className="hover:text-theme-300">
              <div className="text-5xl i-fa6-brands-instagram"></div>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noreferrer nooperner"
              className="hover:text-theme-300"
            >
              <div className="text-5xl i-fa6-brands-facebook"></div>
            </a>
            <a href="/" className="hover:text-theme-300">
              <div className="text-5xl i-fa6-brands-tiktok"></div>
            </a>
          </div>
        </div>
      </Modal>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="pb-8">
              <img src={LogoImg} alt="logo image" className="w-20 md:w-24" />
            </div>
            <div className="flex justify-end py-2 px-1 text-2xl w-[240px] md:w-[25rem]">
              <button onClick={openSetup}>
                <div className="i-heroicons-cog-6-tooth-solid"></div>
              </button>
              <button onClick={onOpenModal} className="ml-6">
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
