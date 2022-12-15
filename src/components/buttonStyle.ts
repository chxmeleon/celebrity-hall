import { cva, VariantProps } from 'class-variance-authority'

export type ButtonProps = VariantProps<typeof buttonStyle>
export const buttonStyle = cva('text-center  m-auto', {
  variants: {
    intent: {
      linerSlope:
        'py-3 px-7 text-gray-800 bg-gradient-to-r hover:via-amber-200 from-theme-200 via-theme-300 to-theme-200 hover:from-theme-400 hover:to-theme-400',
      goldFill: 'bg-theme-300 text-gray-800',
      linerSlopeOutline: 'p-[1.16px] bg-link-button-54 hover:cursor-pointer',
      slopeOutlineBg: 'py-1.5 flex justify-center items-center bg-gradient-to-b from-theme-150 to-theme-70 back',
      grayFill: 'py-1.5 bg-theme-75',
    },
    round: {
      full: 'rounded-full',
      xl: 'rounded-xl',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
    size: {
      full: 'w-full font-light',
      small: 'text-sm w-[130px]',
      medium: 'text-lg w-[230px] font-medium',
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
