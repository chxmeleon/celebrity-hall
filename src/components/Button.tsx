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
  const { children, href } = props
  return (
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
