import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { SetupProvider } from '@/context/LanguageContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SetupProvider>
          <ResponsiveProvider>
            <Responsive.Media>
              <Router />
            </Responsive.Media>
          </ResponsiveProvider>
        </SetupProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
