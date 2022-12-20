import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { SetupProvider } from '@/hooks/useSetup'

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
