import React, { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buttonStyle as bts } from './buttonStyle'

type LoginButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

type LinkButtonProps = {
  href: string
  isTarget: boolean
}

type ToggleButtonProps = {
  href: string
  isTarget: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}


export const BetButton: React.FC<React.PropsWithChildren<LoginButtonProps>> = ({children, onClick}) => {
  return (
    <button className={bts({intent: 'outlineButton', round: 'full', size: 'little'})}>
      {children}
    </button>
  )
  
}




export const LoginButton: React.FC<
  React.PropsWithChildren<LoginButtonProps>
> = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      className={bts({
        intent: 'linerSlope',
        round: 'full',
        size: 'medium',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const LinkButton: React.FC<React.PropsWithChildren<LinkButtonProps>> = ({
  children,
  href,
  isTarget,
}) => {
  const location = useLocation()
  const currentPath = location.pathname
  const isCurrentPath = (href: string) => href === currentPath && true

  return (
    <>
      {isTarget ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <div
            className={bts({
              intent: 'slopeOutline',
              round: 'sm',
              size: 'full',
            })}
          >
            <div
              className={bts({
                intent: 'slopeOutlineBg',
                round: 'sm',
                size: 'full',
              })}
            >
              <p className="font-medium text-md">{children}</p>
            </div>
          </div>
        </a>
      ) : (
        <Link to={href} key={href}>
          <div
            className={bts({
              intent: isCurrentPath(href)
                ? 'activedSlopeOutline'
                : 'slopeOutline',
              round: 'sm',
              size: 'full',
            })}
          >
            <div
              className={bts({
                intent: isCurrentPath(href)
                  ? 'activedSlopeBg'
                  : 'slopeOutlineBg',
                round: 'sm',
                size: 'full',
              })}
            >
              <p className="font-medium text-md">{children}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export const RightSidebarButton: React.FC<
  React.PropsWithChildren<ToggleButtonProps>
> = ({ children, href, isTarget, onClick }) => {
  return (
    <>
      {isTarget ? (
        <button
          className={bts({
            intent: 'grayFill',
            round: 'sm',
            size: 'full',
          })}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center pl-8 [&_p]:pl-5">{children}</div>
          </a>
        </button>
      ) : (
        <button
          className={bts({
            intent: 'grayFill',
            round: 'sm',
            size: 'full',
          })}
          onClick={onClick}
        >
          <div className="flex items-center pl-8 [&_p]:pl-5">{children}</div>
        </button>
      )}
    </>
  )
}
