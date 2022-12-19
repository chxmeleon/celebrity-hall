import React, { createContext, useContext, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import message from '@/i18n'
import { useLocalStorage } from 'usehooks-ts'

interface LangContextData {
  isShow: boolean
  locale: string
  isSelected: string
  openModal: () => void
  closeModal: () => void
  handleSelectValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const LangContext = createContext<LangContextData>({} as LangContextData)

export const LangProvider = ({ children }: { children: JSX.Element }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const locale = navigator.language.toLowerCase()
  const [isSelected, setIsSelected] = useLocalStorage('lang', locale)
  const localStorageLang = localStorage
    .getItem('lang')
    ?.split('"')
    ?.slice(1, 2)
    ?.toString() as string

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
      locale,
      isSelected,
      openModal,
      closeModal,
      handleSelectValue,
    }),
    [isShow, locale, isSelected]
  )

  return (
    <LangContext.Provider value={value}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale={message['en-US']}
        messages={message[localStorageLang]}
      >
        {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}

export const useLang = () => {
  return useContext(LangContext)
}
