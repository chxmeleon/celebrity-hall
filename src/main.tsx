import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import 'uno.css'
import './styles/globals.scss'
import { IntlProvider } from 'react-intl'
import { AuthProvider } from '@/hooks/useAuth'

const locale = navigator.language

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} key={locale} defaultLocale="zh-TW">
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </IntlProvider>
  </React.StrictMode>
)
