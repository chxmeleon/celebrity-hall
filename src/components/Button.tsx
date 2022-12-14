import { buttonStyle } from './buttonStyle'

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
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

export default Button
