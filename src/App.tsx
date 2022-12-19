import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'

function App() {
  return (
    <ResponsiveProvider>
      <Responsive.Media>
        <Router />
      </Responsive.Media>
    </ResponsiveProvider>
  )
}

export default App
