import React, {
  createContext,
  SelectHTMLAttributes,
  useContext,
  useMemo,
  useState,
} from 'react'
import { IntlProvider } from 'react-intl'
import message from '@/i18n'

interface LangContextData {
  isShow: boolean
  locale: string
  openModal: () => void
  closeModal: () => void
  handleSelectValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const LangContext = createContext<LangContextData>({} as LangContextData)

export const LangProvider = ({ children }: { children: JSX.Element }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [locale, setLocale] = useState<string>(navigator.language.toLowerCase())

  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value)
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
      openModal,
      closeModal,
      handleSelectValue,
    }),
    [isShow, locale]
  )

  return (
    <LangContext.Provider value={value}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale={message['en-US']}
        messages={message[locale]}
      >
        {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}

export const useLang = () => {
  return useContext(LangContext)
}
