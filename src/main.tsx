import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import 'uno.css'
import './styles/globals.scss'

export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
NodePlayer.load(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
