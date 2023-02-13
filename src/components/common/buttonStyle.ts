import { cva, VariantProps } from 'class-variance-authority'

export type ButtonProps = VariantProps<typeof buttonStyle>
export const buttonStyle = cva('w-full text-center m-auto', {
  variants: {
    intent: {
      linerSlope: [
        'py-3',
        'px-7',
        'text-gray-800',
        'bg-gradient-to-r',
        'hover:via-amber-200',
        'from-theme-200',
        'via-theme-300',
        'to-theme-200',
        'hover:from-theme-400',
        'hover:to-theme-400',
      ],
      goldFill: 'bg-theme-300 text-gray-800',
      slopeOutline: [
        'p-[1.16px]',
        'bg-link-button-54',
      ],
      activedSlopeOutline: [
        'p-[1px]',
        'bg-link-button-54',
        'shadow-md',
        'shadow-theme-300/70',
      ],
      slopeOutlineBg: [
        'py-1.5',
        'flex',
        'justify-center',
        'text-gray-100',
        'hover:text-theme-50',
        'items-center',
        'bg-gradient-to-b',
        'from-theme-150',
        'to-theme-70',
        'back',
        'hover:bg-gradient-to-tr',
        'hover:from-theme-400',
        'hover:via-theme-300',
        'hover:to-theme-400 ',
        'active:from-theme-150',
        'active:to-theme-70',
        'active:text-gray-100'
      ],
      activedSlopeBg: [
        'py-1.5',
        'flex',
        'justify-center',
        'text-gray-800',
        'items-center',
        'back',
        'bg-gradient-to-tr',
        'from-theme-400',
        'via-theme-300',
        'to-theme-400',
        'before:w-[9.3rem]',
        'before:h-[2.7rem]',
        'before:absolute',
        'before:rounded-full',
        'before:blur-xl',
        'before:bg-amber-100/40'
      ], 
      grayFill: [
        'py-3',
        'bg-theme-50/50',
        'border-b',
        'border-b-theme-70',
        'hover:bg-theme-150/50',
        'hover:text-gray-100',
        'active:bg-theme-400',
        'active:text-theme-50',
      ],
      outlineButton: [
        'py-1.5',
        'px-4',
        'font-bold',
        'flex',
        'bg-theme-70/90',
        'justify-around',
        'items-center',
        'border',
        'drop-shadow-2xl'
      ],

      outlineSwitch: [
        'py-1.5',
        'px-4',
        'font-bold',
        'flex',
        'bg-theme-70/90',
        'justify-around',
        'items-center',
        'border',
        'drop-shadow-2xl',
      ],

      outlineSwitchRev: [
        'py-1.5',
        'px-4',
        'font-bold',
        'flex',
        'text-theme-70/90',
        'justify-around',
        'items-center',
        'border',
        'drop-shadow-2xl',
        'bg-theme-300'
      ],

    },
    round: {
      full: 'rounded-full',
      xl: 'rounded-xl',
      md: 'rounded-md',
      sm: 'rounded-sm',
      none: ''
    },
    size: {
      full: 'w-full',
      tiny: 'w-full text-sm font-medium ',
      small: 'text-sm py-1 w-[130px]',
      medium: 'text-lg w-[230px] font-medium',
      none: '',
      little: 'py-1 px-3 mx-1.5'
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
