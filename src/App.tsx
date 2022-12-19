import Router from '@/router'
import { useState } from 'react'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { IntlProvider } from 'react-intl'
import Modal from '@/components/Modal'
import message from '@/i18n'

function App() {
  const [locale, setLocale] = useState(navigator.language.toLowerCase())
  const [show, setShow] = useState<boolean>(false)

  const openModal = () => {
    setShow(true)
  }

  const closeModal = () => {
    setShow(false)
  }

  const handleSelectValue = (e: any) => {
    setLocale(e.target.value)
  }

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      defaultLocale={message['en-US']}
      messages={message[locale]}
    >
      <ResponsiveProvider>
        <Responsive.Media>
          <Modal show={show} onClick={closeModal} onChange={handleSelectValue} locale={locale}  />
          <Router setLocale={setLocale} openModal={openModal} />
        </Responsive.Media>
      </ResponsiveProvider>
    </IntlProvider>
  )
}

export default App
