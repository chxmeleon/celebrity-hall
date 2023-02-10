import { cva, VariantProps } from 'class-variance-authority'

export type DeskProps = VariantProps<typeof deskStyle>

export const deskStyle = cva('relative font-medium', {
  variants: {
    intent: {
      htop: 'border-t-2 text-xl [&_p]:text-sm ',
      center: 'text-2xl',
      bottom: 'border-b-2 text-xl',
      hbottom: 'border-b-2 ',
      hycenter: 'border-y-2',
      userHBottom: 'border-b-2 bg-theme-50/20',
      userLBottom: 'border-L-2 bg-theme-50/20',
      userRBottom: 'border-R-2 bg-theme-50/20',
    },
    hover: {
      default: 'hover:bg-indigo-900/50',
      none: ''
    },
    bg: {
      default: 'bg-theme-50/30',
      none: ''
    },
    side: {
      full: 'rounded-full',
      tlFull: 'rounded-tl-full border-l-2',
      trFull: 'rounded-tr-full border-r-2',
      blFull: 'rounded-bl-full border-l-2',
      brFull: 'rounded-br-full border-r-2',
      lside: 'border-l-2',
      rside: 'border-r-2',
      halfWSide: 'w-1/2',
      halfWLSide: 'w-1/2 border-l-2',
      halfWRSide: 'w-1/2 border-r-2',
      halfHSide: 'h-1/2 w-full',
      none: '',
    },
    span: {
      col2: 'col-span-2',
      col3: 'col-span-3',
      col4: 'col-span-4',
      col5: 'col-span-5',
      row2: 'row-span-2',
      row3: 'row-span-3',
      none: '',
    },
    border: {
      none: 'border-0 border-transparent',
      default: 'border border-gray-300/50'
    },
    grid: {
      none: '',
      row2cols4: 'grid grid-rows-2 grid-cols-4'
    }
  },
  compoundVariants: [
    {
      intent: 'htop',
      side: 'full',
      span: 'col2',
      border: 'default',
      bg: 'default',
      hover: 'none',
      grid: 'none'
    },
  ],
  defaultVariants: {
    intent: 'htop',
    side: 'full',
    span: 'col2',
    border: 'default',
    bg: 'default',
    hover: 'default',
    grid: 'none'
  },
})

export const btnIdx = {
  tl2:     deskStyle({ intent: 'htop',        side: 'lside',      span: 'col2' }),
  tn2:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col2' }),
  tn3:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col3' }),
  tr2:     deskStyle({ intent: 'htop',        side: 'rside',      span: 'col2' }),
  cl4:     deskStyle({ intent: 'center',      side: 'lside',      span: 'col4' }),
  cn3:     deskStyle({ intent: 'center',      side: 'none',       span: 'col3' }),
  cr4:     deskStyle({ intent: 'center',      side: 'rside',      span: 'col4' }),
  bln:     deskStyle({ intent: 'bottom',      side: 'blFull',     span: 'none', hover: 'none' }),
  bnn:     deskStyle({ intent: 'bottom',      side: 'none',       span: 'none', hover: 'none' }),
  brn:     deskStyle({ intent: 'bottom',      side: 'brFull',     span: 'none', hover: 'none' }),
  tn4:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col4' }),
  tl5:     deskStyle({ intent: 'htop',        side: 'lside',      span: 'col5' }),
  tr5:     deskStyle({ intent: 'htop',        side: 'rside',      span: 'col5' }),
  cn4:     deskStyle({ intent: 'center',      side: 'none',       span: 'col4' }),
  cl5:     deskStyle({ intent: 'center',      side: 'lside',      span: 'col5' }),
  cr5:     deskStyle({ intent: 'center',      side: 'rside',      span: 'col5' }),
  thn:     deskStyle({ intent: 'htop',        side: 'halfWSide',  span: 'none' }),
  bhn:     deskStyle({ intent: 'bottom',      side: 'halfWLSide', span: 'none' }),
  bhln:    deskStyle({ intent: 'bottom',      side: 'halfWLSide', span: 'none' }),
  hbhn:    deskStyle({ intent: 'hbottom',     side: 'halfWLSide', span: 'none' }),
  hbhln:   deskStyle({ intent: 'hbottom',     side: 'halfWLSide', span: 'none' }),
  hbhrn:   deskStyle({ intent: 'hbottom',     side: 'halfWRSide', span: 'none' }),
  bn4:     deskStyle({ intent: 'hbottom',     side: 'none',       span: 'col4' }),
  thhn:    deskStyle({ intent: 'htop',        side: 'halfHSide',  span: 'none' }),
  bhhn:    deskStyle({ intent: 'hbottom',     side: 'halfHSide',  span: 'none' }),
  ynn:     deskStyle({ intent: 'hycenter',    side: 'none',       span: 'none' }),
  isUserL: deskStyle({ intent: 'userLBottom', side: 'blFull',     span: 'none', hover: 'none' }),
  isUserN: deskStyle({ intent: 'userHBottom', side: 'none',       span: 'none', hover: 'none' }),
  isUserR: deskStyle({ intent: 'userRBottom', side: 'brFull',     span: 'none', hover: 'none' }),
}


export const btnIdxNoBorder = {
  tl2:     deskStyle({ intent: 'htop',        side: 'lside',      span: 'col2', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  tn2:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col2', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  tn3:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col3', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  tr2:     deskStyle({ intent: 'htop',        side: 'rside',      span: 'col2', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  cl4:     deskStyle({ intent: 'center',      side: 'lside',      span: 'col4', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  cn3:     deskStyle({ intent: 'center',      side: 'none',       span: 'col3', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  cr4:     deskStyle({ intent: 'center',      side: 'rside',      span: 'col4', border: 'none', hover: 'none', bg: 'none', grid: 'row2cols4' }),
  bln:     deskStyle({ intent: 'bottom',      side: 'blFull',     span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  bnn:     deskStyle({ intent: 'bottom',      side: 'none',       span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  brn:     deskStyle({ intent: 'bottom',      side: 'brFull',     span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  tn4:     deskStyle({ intent: 'htop',        side: 'none',       span: 'col4', border: 'none', hover: 'none', bg: 'none' }),
  tl5:     deskStyle({ intent: 'htop',        side: 'lside',      span: 'col5', border: 'none', hover: 'none', bg: 'none' }),
  tr5:     deskStyle({ intent: 'htop',        side: 'rside',      span: 'col5', border: 'none', hover: 'none', bg: 'none' }),
  cn4:     deskStyle({ intent: 'center',      side: 'none',       span: 'col4', border: 'none', hover: 'none', bg: 'none' }),
  cl5:     deskStyle({ intent: 'center',      side: 'lside',      span: 'col5', border: 'none', hover: 'none', bg: 'none' }),
  cr5:     deskStyle({ intent: 'center',      side: 'rside',      span: 'col5', border: 'none', hover: 'none', bg: 'none' }),
  thn:     deskStyle({ intent: 'htop',        side: 'halfWSide',  span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  bhn:     deskStyle({ intent: 'bottom',      side: 'halfWLSide', span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  bhln:    deskStyle({ intent: 'bottom',      side: 'halfWLSide', span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  hbhn:    deskStyle({ intent: 'hbottom',     side: 'halfWLSide', span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  hbhln:   deskStyle({ intent: 'hbottom',     side: 'halfWLSide', span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  hbhrn:   deskStyle({ intent: 'hbottom',     side: 'halfWRSide', span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  bn4:     deskStyle({ intent: 'hbottom',     side: 'none',       span: 'col4', border: 'none', hover: 'none', bg: 'none' }),
  thhn:    deskStyle({ intent: 'htop',        side: 'halfHSide',  span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  bhhn:    deskStyle({ intent: 'hbottom',     side: 'halfHSide',  span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  ynn:     deskStyle({ intent: 'hycenter',    side: 'none',       span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  isUserL: deskStyle({ intent: 'userLBottom', side: 'blFull',     span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  isUserN: deskStyle({ intent: 'userHBottom', side: 'none',       span: 'none', border: 'none', hover: 'none', bg: 'none' }),
  isUserR: deskStyle({ intent: 'userRBottom', side: 'brFull',     span: 'none', border: 'none', hover: 'none', bg: 'none' }),
}

