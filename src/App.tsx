import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/components/Responsive'

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
