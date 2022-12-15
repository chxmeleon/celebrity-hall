import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle as bts } from './buttonStyle'

type LoginButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

type LinkButtonProps = {
  children: React.ReactNode
  href: string
  target: boolean
}

type ToggleButtonProps = {
  children: React.ReactNode
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
  const { children, href, target = false } = props
  return (
    <>
      {target ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <div
            className={bts({
              intent: 'linerSlopeOutline',
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
              <p className="text-xl text-white">{children}</p>
            </div>
          </div>
        </a>
      ) : (
        <Link to={href}>
          <div
            className={bts({
              intent: 'linerSlopeOutline',
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
              <p className="text-xl text-white">{children}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { children } = props
  return (
    <button
      className={bts({
        intent: 'grayFill',
        round: 'full',
        size: 'full',
      })}
    >
      <p className="text-sm font-medium">{children}</p>
    </button>
  )
}
