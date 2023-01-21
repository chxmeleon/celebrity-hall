import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter, MemoryRouter, useLocation } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ApiProvider } from '@/contexts/ApiContext'
import { SetupProvider } from './contexts/SetupContext'
import { ActionCableProvider } from './contexts/ActionCableContext'
import { StreamLatencyProvider } from './contexts/StreamLatencyContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ActionCableProvider>
          <LanguageProvider>
            <ApiProvider>
              <SetupProvider>
                <ResponsiveProvider>
                  <StreamLatencyProvider>
                    <Router />
                  </StreamLatencyProvider>
                </ResponsiveProvider>
              </SetupProvider>
            </ApiProvider>
          </LanguageProvider>
        </ActionCableProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
