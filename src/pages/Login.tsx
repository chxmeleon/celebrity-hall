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
    <div className="flex relative justify-center items-center h-full w-full">
      <AuthAlert />
      <Modal isShow={isShow} onClose={onCloseModal}>
        text
      </Modal>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="pb-8">
              <img src={LogoImg} alt="logo image" className="w-20 md:w-24" />
            </div>
            <div className="flex justify-end px-1  text-2xl w-[240px] md:w-[25rem] py-2">
              <button onClick={openSetup}>
                <div className="i-heroicons-cog-6-tooth-solid"></div>
              </button>
              <button onClick={onOpenModal}className="ml-6">
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
