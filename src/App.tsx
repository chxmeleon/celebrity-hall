import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { SetupProvider } from '@/contexts/LanguageContext'
import { ApiProvider } from '@/contexts/ApiContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <SetupProvider>
            <ResponsiveProvider>
              <Responsive.Media>
                <Router />
              </Responsive.Media>
            </ResponsiveProvider>
          </SetupProvider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
