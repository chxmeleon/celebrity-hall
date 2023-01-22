import { useModal } from '@/hooks/modal'
import { createContext, useContext, useMemo, useState } from 'react'
import {
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  deviceType
} from 'react-device-detect'

interface SetupContextData {
  isShowSetup: boolean
  isShowNotice: boolean
  isShowEditPassword: boolean
  isShowEditNickname: boolean
  isRegular: boolean
  openSetup: () => void
  closeSetup: () => void
  openNotice: () => void
  closeNotice: () => void
  openEditPassword: () => void
  closeEditPassword: () => void
  openEditNickname: () => void
  closeEditNickname: () => void
  handleRegularToggle: () => void
  deviceInfo: { [key: string]: string }
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


  const [isRegular, setIsRegular] = useState(false)
  const handleRegularToggle = () => setIsRegular((isRegular) => !isRegular)
  const deviceInfo = useMemo(
    () => ({
      osVersion,
      osName,
      fullBrowserVersion,
      browserName,
      mobileVendor,
      mobileModel,
      engineName,
      engineVersion,
      deviceType,
      userAgent: getUA
    }),
    []
  )

  const value = {
    isShowSetup,
    isShowNotice,
    isShowEditPassword,
    isShowEditNickname,
    isRegular,
    openSetup,
    closeSetup,
    openNotice,
    closeNotice,
    openEditPassword,
    closeEditPassword,
    openEditNickname,
    closeEditNickname,
    handleRegularToggle,
    deviceInfo
  }

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>

}

export const useSetup = () => useContext(SetupContext)
