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
  xxl: 1400
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
`

export type ResponsiveMediaSizeType = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type ResponsiveOrientationType = 'portrait' | 'landscape'

type ResponsiveMediaProps = React.PropsWithChildren<{
  className?: string
  lessThan?: ResponsiveMediaSizeType
  greaterThanOrEqual?: ResponsiveMediaSizeType
  orientation?: ResponsiveOrientationType
}>

const ResponsiveMedia: React.FC<ResponsiveMediaProps> = ({
  className: defaultClassName = '',
  lessThan,
  greaterThanOrEqual,
  orientation,
  children
}) => {
  let className = defaultClassName
  if (lessThan) className += ` responsive-lt-${lessThan}`
  if (greaterThanOrEqual) className += ` responsive-gte-${greaterThanOrEqual} `
  if (orientation) className += ` responsive-${orientation} `

  return <div className={className}>{children}</div>
}

export const DefaultResponsiveMedia: React.FC<ResponsiveMediaProps> = (
  props
) => {
  const mediaQueries: string[] = []
  if (props.lessThan)
    mediaQueries.push(`(max-width: ${BREAK_POINTS[props.lessThan] - 1}px)`)
  if (props.greaterThanOrEqual)
    mediaQueries.push(
      `(min-width: ${BREAK_POINTS[props.greaterThanOrEqual]}px)`
    )
  if (props.orientation)
    mediaQueries.push(`(orientation: ${props.orientation})`)

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
}>({
  isMobile: true,
  isDesktop: true
})

export const ResponsiveProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [isMobile, setIsMobile] = useState(true)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const onWindowResize = () => {
      const { matches: matchesMobile } = window.matchMedia(
        `(max-width: ${BREAK_POINT - 1}px)`
      )
      const { matches: matchesDesktop } = window.matchMedia(
        `(min-width: ${BREAK_POINT}px)`
      )

      setIsMobile(matchesMobile)
      setIsDesktop(matchesDesktop)
    }

    onWindowResize()
    window.addEventListener('resize', onWindowResize, { passive: true })
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return (
    <ResponsiveContext.Provider value={{ isMobile, isDesktop }}>
      <StyledResponsiveStyle />
      {children}
    </ResponsiveContext.Provider>
  )
}

export const Responsive = {
  Default: ({
    className,
    children
  }: React.PropsWithChildren<{ className?: string }>) => {
    const { isMobile } = useContext(ResponsiveContext)
    return isMobile ? (
      <ResponsiveMedia className={className} lessThan="md">
        {children}
      </ResponsiveMedia>
    ) : (
      (null as any)
    )
  },
  Desktop: ({
    className,
    children
  }: React.PropsWithChildren<{ className?: string }>) => {
    const { isDesktop } = useContext(ResponsiveContext)
    return isDesktop ? (
      <ResponsiveMedia className={className} greaterThanOrEqual="md">
        {children}
      </ResponsiveMedia>
    ) : (
      (null as any)
    )
  },
  Media: DefaultResponsiveMedia
}
