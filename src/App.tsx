import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ApiProvider } from '@/contexts/ApiContext'
import { SetupProvider } from './contexts/SetupContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ApiProvider>
            <SetupProvider>
              <ResponsiveProvider>
                <Router />
              </ResponsiveProvider>
            </SetupProvider>
          </ApiProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
