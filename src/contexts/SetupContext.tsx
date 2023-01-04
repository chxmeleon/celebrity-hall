import { useModal } from '@/hooks/modal'
import { createContext, useContext, useMemo, useState } from 'react'

interface SetupContextData {
  isShowSetup: boolean
  isShowNotice: boolean
  isRegular: boolean
  openSetup: () => void
  closeSetup: () => void
  openNotice: () => void
  closeNotice: () => void
  handleRegularToggle: () => void
}

const SetupContext = createContext<SetupContextData>({} as SetupContextData)

export const SetupProvider = ({ children }: { children: JSX.Element }) => {
  const {
    isShow: isShowSetup,
    onOpenModal: openSetup,
    onCloseModal: closeSetup,
  } = useModal()

  const {
    isShow: isShowNotice,
    onOpenModal: openNotice,
    onCloseModal: closeNotice,
  } = useModal()

  const [isRegular, setIsRegular] = useState(false)
  const handleRegularToggle = () => setIsRegular((isRegular) => !isRegular)

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
    }),
    [isShowSetup, isShowNotice, isRegular]
  )

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
}

export const useSetup = () => useContext(SetupContext)
