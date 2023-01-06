import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { fullRecordMapper, outlineRecordMapper } from './data'

type TileProps = {
  status: string
}

const tileContainer = cx(
  'flex w-full h-full text-xs font-light text-gray-50 border-r border-b border-gray-400 aspect-square'
)

export const WinRecordTile: React.FC<TileProps> = ({ status }) => {
  const winRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square',
    fullRecordMapper[status]?.className
  )
  return (
    <div className={tileContainer}>
      <div className={winRecordTileStyle}>
        {status !== '' ? (
          <FormattedMessage
            id={fullRecordMapper[status]?.contentId}
            defaultMessage={status}
          />
        ) : null}
      </div>
    </div>
  )
}

export const BigRecordTile: React.FC<TileProps> = ({ status }) => {
  const bigRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square border-2',
    outlineRecordMapper[status]?.className ?? 'border-transparent'
  )

  return (
    <div className={tileContainer}>
      <div className={bigRecordTileStyle}></div>
    </div>
  )
}

export const BigEyeRecordTile: React.FC<TileProps> = ({ status }) => {
  const bigRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square border-2',
    outlineRecordMapper[status]?.className ?? 'border-transparent'
  )
  return (
    <div className={tileContainer}>
      <div className={bigRecordTileStyle}></div>
    </div>
  )
}

export const SmallRecordTile: React.FC<TileProps> = ({ status }) => {
  const smallRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[84%] h-[84%] rounded-full aspect-square',
    fullRecordMapper[status]?.className
  )

  return (
    <div className={tileContainer}>
      <div className={smallRecordTileStyle}></div>
    </div>
  )
}

export const CockroachRecordTile: React.FC<TileProps> = ({ status }) => {
  const cockroachRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[80%] h-[1px] -rotate-45 translate-y-0 aspect-square',
    fullRecordMapper[status]?.className
  )

  return (
    <div className={tileContainer}>
      <div className={cockroachRecordTileStyle}></div>
    </div>
  )
}

export const BaseGrid: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="relative w-full h-full border-r border-b border-gray-500/90">
    <div className="grid grid-cols-10 grid-rows-6 grid-flow-col auto-cols-fr w-full h-full">
      {children}
    </div>
  </div>
)

export const BigRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <div className="relative w-full h-full border-r border-b border-gray-500/90">
    <div className="grid grid-rows-6 grid-flow-col auto-cols-fr w-full h-full grid-cols-25">
      {children}
    </div>
  </div>
)

export const SmallRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <div className="relative w-full h-full border-r border-b border-gray-500/90">
    <div className="grid grid-rows-6 grid-flow-col auto-cols-fr w-full h-full grid-cols-15">
      {children}
    </div>
  </div>
)

export const winRecord = [
  'p',
  't',
  'p',
  'b',
  'p',
  't',
  'b',
  't',
  'p',
  't',
  't',
  't',
  'b',
  'p',
  'p',
  'b',
  'b',
  'p',
  't',
  'p',
  'b',
  'b',
  'b',
  'b',
  'p',
  't',
  't',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

export const fakeData = [
  't',
  't',
  'b',
  'b',
  't',
  'b',
  'p',
  't',
  'b',
  't',
  't',
  't',
  't',
  'p',
  't',
  'p',
  't',
  'b',
  'p',
  'b',
  'p',
  'p',
  'b',
  'p',
  't',
  'b',
  'p',
  't',
  't',
  'p',
  'b',
  'p',
  'p',
  'b',
  'p',
  'b',
  'b',
  'p',
  'b',
  'p',
  'p',
  't',
  't',
  'b',
  't',
  't',
  'b',
  'p',
  'b',
  't',
  'p',
  't',
  'b',
  't',
  'b',
  'p',
  't',
  'b',
  't',
  'b'
]


export const bigArray = [...new Array(150)].map(() => '')
export const smallArray = [...new Array(90)].map(() => '')
