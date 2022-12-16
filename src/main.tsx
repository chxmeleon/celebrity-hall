import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import 'uno.css'
import './styles/globals.scss'
import { IntlProvider } from 'react-intl'

const locale = navigator.language

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} key={locale} defaultLocale="zh-TW">
      <App />
    </IntlProvider>
  </React.StrictMode>
)
