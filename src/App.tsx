import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { LangProvider } from '@/hooks/useLang'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LangProvider>
          <ResponsiveProvider>
            <Responsive.Media>
              <Router />
            </Responsive.Media>
          </ResponsiveProvider>
        </LangProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
