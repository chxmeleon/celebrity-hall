import { cva, VariantProps } from 'class-variance-authority'
import { deskStyle as ds } from './deskStyle'

export type DeskProps = VariantProps<typeof deskStyle>

export const deskStyle = cva('text-3xl font-bold border border-gray-300/50', {
  variants: {
    intent: {
      top: 'border-t-2 hover:bg-gray-100/10',
      center: 'hover:bg-gray-100/10 ',
      bottom: 'border-b-2',
    },
    side: {
      full: 'rounded-full',
      tlFull: 'rounded-tl-full border-l-2',
      trFull: 'rounded-tr-full border-r-2',
      blFull: 'rounded-bl-full border-l-2',
      brFull: 'rounded-br-full border-r-2',
      lside: 'border-l-2',
      rside: 'border-r-2',
      none: '',
    },
    span: {
      col2: 'col-span-2',
      col3: 'col-span-3',
      col4: 'col-span-4',
      none: '',
    },
  },
  compoundVariants: [
    {
      intent: 'top',
      side: 'full',
      span: 'col2',
    },
  ],
  defaultVariants: {
    intent: 'top',
    side: 'full',
    span: 'col2',
  },
})


export const btnIdx = {
  tl2: ds({ intent: 'top', side: 'lside', span: 'col2' }),
  tn2: ds({ intent: 'top', side: 'none', span: 'col2' }),
  tn3: ds({ intent: 'top', side: 'none', span: 'col3' }),
  tr2: ds({ intent: 'top', side: 'rside', span: 'col2' }),
  cl4: ds({ intent: 'center', side: 'lside', span: 'col4' }),
  cn3: ds({ intent: 'center', side: 'none', span: 'col3' }),
  cr4: ds({ intent: 'center', side: 'rside', span: 'col4' }),
  bln: ds({ intent: 'bottom', side: 'blFull', span: 'none' }),
  bnn: ds({ intent: 'bottom', side: 'none', span: 'none' }),
  brn: ds({ intent: 'bottom', side: 'brFull', span: 'none' }),
}

