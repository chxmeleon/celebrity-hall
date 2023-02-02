import Router from '@/router'
import { ResponsiveProvider } from '@/hooks/useResponsive'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ApiProvider } from '@/contexts/ApiContext'
import { SetupProvider } from './contexts/SetupContext'
import { ActionCableProvider } from './contexts/ActionCableContext'
import { StreamLatencyProvider } from './contexts/StreamLatencyContext'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ActionCableProvider>
          <LanguageProvider>
            <ApiProvider>
              <SetupProvider>
                <ResponsiveProvider>
                  <StreamLatencyProvider>
                    <Router />
                    <Toaster
                      toastOptions={{
                        error: {
                          className: 'text-white bg-red-400'
                        }
                      }}
                    />
                  </StreamLatencyProvider>
                </ResponsiveProvider>
              </SetupProvider>
            </ApiProvider>
          </LanguageProvider>
        </ActionCableProvider>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
