import { createContext, useCallback, useContext, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import message from '@/i18n'
import { useLocalStorage } from 'usehooks-ts'

interface LanguageContextData {
  locale: string
  isSelected: string
  handleSelectValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData
)

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const locale = navigator.language.toLowerCase() 
  const defaultLocale = locale.includes('en') ? 'en' : 'zh-tw'
  const [isSelected, setIsSelected] = useLocalStorage('lang', defaultLocale)
  const handleSelectValue = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsSelected(e.target.value)
    },
    [setIsSelected]
  )

  const value = useMemo(
    () => ({
      locale,
      isSelected,
      handleSelectValue
    }),
    [locale, isSelected, handleSelectValue]
  )

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale="en"
        messages={message[isSelected]}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
