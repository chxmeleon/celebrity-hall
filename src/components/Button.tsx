import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buttonStyle as bts } from './buttonStyle'

type LoginButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

type LinkButtonProps = {
  text: string
  href: string
  isTarget: boolean
}

type ToggleButtonProps = {
  children: React.ReactNode
  href: string
  isTarget: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}


export const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { onClick, text } = props
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
      {text}
    </button>
  )
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { text, href, isTarget } = props
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
              <p className="text-xl">{text}</p>
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
              <p className="text-xl">{text}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export const RightSidebarButton: React.FC<ToggleButtonProps> = (props) => {
  const { children, href, isTarget, onClick } = props
  return (
    <>
      {isTarget ? (
        <a
          className={bts({
            intent: 'grayFill',
            round: 'sm',
            size: 'full',
          })}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex justify-around items-center m-auto w-2/3">
            {children}
          </div>
        </a>
      ) : (
        <button
          className={bts({
            intent: 'grayFill',
            round: 'none',
            size: 'full',
          })}
          onClick={onClick}
        >
          <div className="flex items-center pl-5 [&_p]:pl-5">
            {children}
          </div>
        </button>
      )}
    </>
  )
}
