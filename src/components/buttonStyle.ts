import { cva, VariantProps } from 'class-variance-authority'

export type ButtonProps = VariantProps<typeof buttonStyle>
export const buttonStyle = cva('text-center font-medium m-auto', {
  variants: {
    intent: {
      linerSlope:
        'py-3 px-7 text-gray-800 bg-gradient-to-r hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200 hover:from-theme-400 hover:to-theme-400',
      goldFill: 'bg-theme-300 text-gray-800',
      linerSlopeOutline:
        'p-[1px] bg-link-button-75',
      slopeOutlineBg: 'py-2 flex justify-center items-center bg-theme-50 back',
      black: 'bg-theme-100',
    },
    round: {
      full: 'rounded-full',
      xl: 'rounded-xl',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
    size: {
      full: 'w-full',
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
  ],
  defaultVariants: {
    intent: 'linerSlope',
    round: 'full',
    size: 'medium',
  },
})
