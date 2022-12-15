import React from 'react'
import { Link } from 'react-router-dom'
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
        <Link to={href}>
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
        </Link>
      )}
    </>
  )
}

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { children, href, isTarget } = props
  return (
    <>
      {isTarget ? (
        <a
          className={bts({
            intent: 'grayFill',
            round: 'full',
            size: 'tiny',
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
            round: 'full',
            size: 'tiny',
          })}
        >
          <div className="flex justify-around items-center m-auto w-2/3">
            {children}
          </div>
        </button>
      )}
    </>
  )
}
