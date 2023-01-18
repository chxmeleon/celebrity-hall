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
  isRegular: boolean
  openSetup: () => void
  closeSetup: () => void
  openNotice: () => void
  closeNotice: () => void
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

  const [isRegular, setIsRegular] = useState(true)
  const handleRegularToggle = () => setIsRegular((isRegular) => !isRegular)
  const deviceInfo = {
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
  }

  const value = useMemo(
    () => ({
      isShowSetup,
      isShowNotice,
      isRegular,
      openSetup,
      closeSetup,
      openNotice,
      closeNotice,
      handleRegularToggle,
      deviceInfo
    }),
    [
      isShowSetup,
      isShowNotice,
      isRegular,
      openSetup,
      closeSetup,
      openNotice,
      closeNotice,
      deviceInfo
    ]
  )

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
}

export const useSetup = () => useContext(SetupContext)
