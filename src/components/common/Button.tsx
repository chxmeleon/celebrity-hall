import { clsx as cx } from 'clsx'
import React, { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buttonStyle as bts } from './buttonStyle'

type LoginButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

type BetButtonProps = {
  className?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isDisabled: boolean
}

type BetSwitchProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isDisabled: boolean
  isToggle: boolean
}

type LinkButtonProps = {
  href: string
  isTarget: boolean
}

type ToggleButtonProps = {
  href: string
  isTarget: boolean
  isLink: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const BetButton: React.FC<React.PropsWithChildren<BetButtonProps>> = ({
  className,
  isDisabled,
  children,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cx(
        className,
        isDisabled
          ? 'hover:cursor-not-allowed hover:bg-theme-50 text-theme-400 border-amber-500 bg-red-900'
          : 'text-theme-300 hover:text-theme-50 hover:bg-theme-300 border-theme-300 active:bg-amber-400 active:text-theme-50 ',
        bts({
          intent: 'outlineButton',
          round: 'full',
          size: 'little'
        })
      )}
    >
      {children}
    </button>
  )
}

export const BetRepeat: React.FC<React.PropsWithChildren<BetSwitchProps>> = ({
  isDisabled,
  children,
  isToggle,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cx(
        isDisabled
          ? 'hover:cursor-not-allowed text-theme-400 border-amber-500 bg-red-900'
          : 'border-theme-300 active:bg-theme-300 active:text-theme-50',
        !isToggle
          ? bts({
              intent: 'outlineSwitch',
              round: 'full',
              size: 'little'
            })
          : bts({
              intent: 'outlineSwitchRev',
              round: 'full',
              size: 'little'
            })
      )}
    >
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
        size: 'medium'
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
  isTarget
}) => {
  const location = useLocation()
  const currentPath = location.pathname
  const isCurrentPath = (href: string) => {
    if (href.slice(0, 14) === currentPath.slice(0, 14)) {
      return true
    } else if (href === currentPath) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {isTarget ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <div
            className={bts({
              intent: 'slopeOutline',
              round: 'sm',
              size: 'full'
            })}
          >
            <div
              className={bts({
                intent: 'slopeOutlineBg',
                round: 'sm',
                size: 'full'
              })}
            >
              <div className="font-medium text-md">{children}</div>
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
              size: 'full'
            })}
          >
            <div
              className={bts({
                intent: isCurrentPath(href)
                  ? 'activedSlopeBg'
                  : 'slopeOutlineBg',
                round: 'sm',
                size: 'full'
              })}
            >
              <div
                className={`font-medium text-md ${
                  isCurrentPath(href) ? 'invert opacity-75 text-gray-200' : ''
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export const RightSidebarButton: React.FC<
  React.PropsWithChildren<ToggleButtonProps>
> = ({ children, href, isTarget, isLink, onClick }) => {
  return (
    <>
      {isTarget && !isLink ? (
        <button
          onClick={onClick}
          className={bts({
            intent: 'grayFill',
            round: 'sm',
            size: 'full'
          })}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center pl-8 [&_p]:pl-5">{children}</div>
          </a>
        </button>
      ) : isTarget && isLink ? (
        <Link to={href}>
          <button
            onClick={onClick}
            className={bts({
              intent: 'grayFill',
              round: 'sm',
              size: 'full'
            })}
          >
            <div className="flex items-center pl-8 [&_p]:pl-5">{children}</div>
          </button>
        </Link>
      ) : (
        <button
          className={bts({
            intent: 'grayFill',
            round: 'sm',
            size: 'full'
          })}
          onClick={onClick}
        >
          <div className="flex items-center pl-8 [&_p]:pl-5">{children}</div>
        </button>
      )}
    </>
  )
}
