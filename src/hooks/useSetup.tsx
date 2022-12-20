import React, { createContext, useContext, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import message from '@/i18n'
import { useLocalStorage } from 'usehooks-ts'

interface SetupContextData {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  locale: string
  isSelected: string
  openModal: () => void
  closeModal: () => void
  handleSelectValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SetupContext = createContext<SetupContextData>({} as SetupContextData)

export const SetupProvider = ({ children }: { children: JSX.Element }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const locale = navigator.language.toLowerCase()
  const [isSelected, setIsSelected] = useLocalStorage('lang', locale)
  
  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(e.target.value)
  }

  const openModal = () => {
    setIsShow(true)
  }

  const closeModal = () => {
    setIsShow(false)
  }

  const value = useMemo(
    () => ({
      isShow,
      setIsShow,
      locale,
      isSelected,
      openModal,
      closeModal,
      handleSelectValue,
    }),
    [isShow, setIsShow, locale, isSelected]
  )

  return (
    <SetupContext.Provider value={value}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale={message['en-US']}
        messages={message[isSelected]}
      >
        {children}
      </IntlProvider>
    </SetupContext.Provider>
  )
}

export const useSetup = () => {
  return useContext(SetupContext)
}
