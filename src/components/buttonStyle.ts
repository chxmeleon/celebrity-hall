import { cva, VariantProps } from 'class-variance-authority'

export type ButtonProps = VariantProps<typeof buttonStyle>
export const buttonStyle = cva('text-center font-medium py-3 px-7 m-auto', {
  variants: {
    intent: {
      linerSlope:
        'text-gray-800 bg-gradient-to-r hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200  hover:from-theme-400 hover:to-theme-400',
      goldFill: 'bg-theme-300 text-gray-800',
      goldOutline: 'bg-black border-[1px] border-theme-300',
      black: 'bg-theme-100',
    },
    round: {
      full: 'rounded-full',
      xl: 'rounded-xl',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
    size: {
      small: 'text-sm w-[130px]',
      medium: 'text-lg w-[230px]',
      large: '',
    },
  },
  compoundVariants: [
    {
      intent: 'linerSlope',
      round: 'full',
      size: 'medium',
    },
    {
      intent: 'goldFill',
      round: 'full',
      size: 'medium',
    },
    {
      intent: 'goldOutline',
      round: 'full',
      size: 'medium',
    },
    {
      intent: 'goldOutline',
      round: 'sm',
      size: 'medium',
    },
    {
      intent: 'black',
      round: 'sm',
      size: 'medium',
    },
  ],
  defaultVariants: {
    intent: 'linerSlope',
    round: 'full',
    size: 'medium',
  },
})
