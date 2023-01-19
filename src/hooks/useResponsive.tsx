import React, { useContext, useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

export const BREAK_POINT_SM = 576
export const BREAK_POINT_MD = 768
export const BREAK_POINT = 992
export const BREAK_POINT_XL = 1200

export const BREAK_POINTS: { [key in ResponsiveMediaSizeType]: number } = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

const StyledResponsiveStyle = createGlobalStyle`
  .responsive-lt {
    &-sm, &-md, &-lg, &-xl {
      display: none;
    }
    &-sm {
      @media (max-width: ${BREAK_POINT_SM - 1}px) {
        display: block;
      }
    }
    &-md {
      @media (max-width: ${BREAK_POINT_MD - 1}px) {
        display: block;
      }
    }
    &-lg {
      @media (max-width: ${BREAK_POINT - 1}px) {
        display: block;
      }
    }
    &-xl {
      @media (max-width: ${BREAK_POINT_XL - 1}px) {
        display: block;
      }
    }
  }
  .responsive-gte {
    &-sm, &-md, &-lg, &-xl {
      display: none;
    }
    &-sm {
      @media (min-width: ${BREAK_POINT_SM}px) {
        display: block;
      }
    }
    &-md {
      @media (min-width: ${BREAK_POINT_MD}px) {
        display: block;
      }
    }
    &-lg {
      @media (min-width: ${BREAK_POINT}px) {
        display: block;
      }
    }
    &-xl {
      @media (min-width: ${BREAK_POINT_XL}px) {
        display: block;
      }
    }
  }
  .responsive {
    &-portrait, &-landscape {
      display: none;
    }
    &-portrait {
      @media (orientation: portrait) {
        display: block;
      }
    }
    &-landscape {
      @media (orientation: landscape) {
        display: block;
      }
    }
  }
`

export type ResponsiveMediaSizeType = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type ResponsiveOrientationType = 'portrait' | 'landscape'

type ResponsiveMediaProps = React.PropsWithChildren<{
  lessThan?: ResponsiveMediaSizeType
  greaterThanOrEqual?: ResponsiveMediaSizeType
  orientation?: ResponsiveOrientationType
}>

const ResponsiveMedia: React.FC<ResponsiveMediaProps> = ({ lessThan, greaterThanOrEqual, orientation, children }) => {
  let className = ''
  if (lessThan) className += `responsive-lt-${lessThan} `
  if (greaterThanOrEqual) className += `responsive-gte-${greaterThanOrEqual} `
  if (orientation) className += `responsive-${orientation} `

  return <div className={className}>{children}</div>
}

export const DefaultResponsiveMedia: React.FC<ResponsiveMediaProps> = props => {
  const mediaQueries: string[] = []
  if (props.lessThan) mediaQueries.push(`(max-width: ${BREAK_POINTS[props.lessThan] - 1}px)`)
  if (props.greaterThanOrEqual) mediaQueries.push(`(min-width: ${BREAK_POINTS[props.greaterThanOrEqual]}px)`)
  if (props.orientation) mediaQueries.push(`(orientation: ${props.orientation})`)

  const [isVisible, setIsVisible] = useState(true)
  const mediaQueryString = mediaQueries.join(' and ')
  useEffect(() => {
    const onWindowResize = () => {
      const { matches } = window.matchMedia(mediaQueryString)
      setIsVisible(matches)
    }

    onWindowResize()
    window.addEventListener('resize', onWindowResize, { passive: true })
    return () => window.removeEventListener('resize', onWindowResize)
  }, [mediaQueryString])

  return isVisible ? <ResponsiveMedia {...props} /> : (null as any)
}

export const ResponsiveContext = React.createContext<{
  isMobile: boolean
  isDesktop: boolean
  isPortrait: boolean
  isMobilePortrait: boolean
  isMobileLandscape: boolean
  isMobileLandscapeToolbar: boolean
}>({
  isMobile: true,
  isDesktop: true,
  isPortrait: true,
  isMobilePortrait: true,
  isMobileLandscape: false,
  isMobileLandscapeToolbar: false,
})

export const ResponsiveProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isPortrait, setIsPortrait] = useState(true)
  const [isMobileLandscapeToolbar, setIsMobileLandscapeToolbar] = useState(false)
  const isMobilePortrait = isMobile && isPortrait
  const isMobileLandscape = isMobile && !isPortrait

  useEffect(() => {
    const onWindowResize = () => {
      const { matches: matchesMobile } = window.matchMedia(`(max-width: ${BREAK_POINT - 1}px)`)
      const { matches: matchesDesktop } = window.matchMedia(`(min-width: ${BREAK_POINT}px)`)
      const { matches: matchesPortrait } = window.matchMedia('(orientation: portrait)')
      const { matches: matchesMobileLandscapeToolbar } = window.matchMedia(
        `(max-width: ${BREAK_POINT - 1}px) and (max-height: 300px) and (orientation: landscape)`,
      )

      setIsMobile(matchesMobile)
      setIsDesktop(matchesDesktop)
      setIsPortrait(matchesPortrait)
      setIsMobileLandscapeToolbar(matchesMobileLandscapeToolbar)
    }

    onWindowResize()
    window.addEventListener('resize', onWindowResize, { passive: true })
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return (
    <ResponsiveContext.Provider
      value={{ isMobile, isDesktop, isPortrait, isMobilePortrait, isMobileLandscape, isMobileLandscapeToolbar }}
    >
      <StyledResponsiveStyle />
      {children}
    </ResponsiveContext.Provider>
  )
}

export const Responsive = {
  Default: ({ children }: React.PropsWithChildren) => {
    const { isMobile } = useContext(ResponsiveContext)
    return isMobile ? <ResponsiveMedia lessThan="lg">{children}</ResponsiveMedia> : (null as any)
  },
  Desktop: ({ children }: React.PropsWithChildren) => {
    const { isDesktop } = useContext(ResponsiveContext)
    return isDesktop ? <ResponsiveMedia greaterThanOrEqual="xl">{children}</ResponsiveMedia> : (null as any)
  },
  MobilePortrait: ({ children }: React.PropsWithChildren) => {
    const { isMobilePortrait } = useContext(ResponsiveContext)
    return isMobilePortrait ? (
      <ResponsiveMedia lessThan="lg" orientation="portrait">
        {children}
      </ResponsiveMedia>
    ) : (
      (null as any)
    )
  },
  Media: DefaultResponsiveMedia,
}
