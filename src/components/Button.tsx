import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle } from './buttonStyle'

type LoginButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

type LinkButtonProps = {
  children: React.ReactNode
  href: string
}

export const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { onClick, text } = props
  return (
    <button
      type="submit"
      className={buttonStyle({
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
    <div>
      <div
        className={buttonStyle({
          intent: 'linerSlopeOutline',
          round: 'sm',
          size: 'full',
        })}
      >
        <div
          className={buttonStyle({
            intent: 'slopeOutlineBg',
            round: 'sm',
            size: 'full',
          })}
        >
          <h1 className="text-xl text-white">{children}</h1>
        </div>
      </div>
    </div>
  )
}
