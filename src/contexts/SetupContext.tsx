import { useModal } from '@/hooks/modal'
import { createContext, useContext, useMemo, useState } from 'react'

interface SetupContextData {
  isShowSetup: boolean
  isShowNotice: boolean
  isShowEditPassword: boolean
  isShowEditNickname: boolean
  openSetup: () => void
  closeSetup: () => void
  openNotice: () => void
  closeNotice: () => void
  openEditPassword: () => void
  closeEditPassword: () => void
  openEditNickname: () => void
  closeEditNickname: () => void
}

const SetupContext = createContext<SetupContextData>({} as SetupContextData)

export const SetupProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const {
    isShow: isShowSetup,
    onOpenModal: openSetup,
    onCloseModal: closeSetup
  } = useModal()

  const {
    isShow: isShowNotice,
    onOpenModal: openNotice,
    onCloseModal: closeNotice
  } = useModal()

  const {
    isShow: isShowEditPassword,
    onOpenModal: openEditPassword,
    onCloseModal: closeEditPassword
  } = useModal()

  const {
    isShow: isShowEditNickname,
    onOpenModal: openEditNickname,
    onCloseModal: closeEditNickname
  } = useModal()



  const value = {
    isShowSetup,
    isShowNotice,
    isShowEditPassword,
    isShowEditNickname,
    openSetup,
    closeSetup,
    openNotice,
    closeNotice,
    openEditPassword,
    closeEditPassword,
    openEditNickname,
    closeEditNickname,
  }

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>

}

export const useSetup = () => useContext(SetupContext)
