import Router from '@/router'
import { ResponsiveProvider, Responsive } from '@/hooks/useResponsive'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ApiProvider } from '@/contexts/ApiContext'
import { SetupProvider } from './contexts/SetupContext'
import { ActionCableProvider } from './contexts/ActionCableContext'
import { StreamLatencyProvider } from './contexts/StreamLatencyContext'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const onResizeWindow = () => {
      const isMobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )

      const bodyHeight = document.body.clientHeight
      const bodyWidth = document.body.clientWidth
      const displayWidth = bodyWidth > 1200 ? 1200 : bodyWidth

      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth

      console.log(windowWidth, bodyWidth)
      console.log(
        `window size: ${windowWidth}x${windowHeight}`,
        windowHeight / bodyHeight,
        windowWidth / bodyWidth
      )

      let scaling = 1
      let width = ''
      if (!isMobile) {
        if (windowHeight / bodyHeight > windowWidth / displayWidth) {
          scaling = windowWidth / displayWidth
        } else {
          scaling = windowHeight / bodyHeight

          if (displayWidth * scaling > windowWidth) {
            width = `${(1 / scaling) * 100}%`
          }
        }
      }

      document.body.style.transform = `scale(${scaling})`
      document.body.style.width = width
    }

    onResizeWindow()
    window.addEventListener('resize', onResizeWindow)
    return () => {
      window.removeEventListener('resize', onResizeWindow)
    }
  }, [])

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
