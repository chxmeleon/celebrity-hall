import { PropsWithChildren } from 'react'
import { useIntl } from 'react-intl'

interface TileProps {
  status: string
}

export const WinRecordTile: React.FC<TileProps> = ({ status }) => {
  const { formatMessage } = useIntl()

  return (
    <div className="flex w-full h-full text-sm font-light text-gray-50 border-r border-b border-gray-400 aspect-square">
      {status === 'b' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-red-500 rounded-full aspect-square">
          {formatMessage({
            id: 'screens.baccaratRoom.dealer',
            defaultMessage: 'b',
          })}
        </div>
      ) : status === 'p' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-blue-500 rounded-full aspect-square">
          {formatMessage({
            id: 'screens.baccaratRoom.player',
            defaultMessage: 'b',
          })}
        </div>
      ) : status === 't' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-teal-500 rounded-full aspect-square">
          {formatMessage({
            id: 'screens.baccaratRoom.tie',
            defaultMessage: 'b',
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 text-transparent rounded-full aspect-square">
          <p>n</p>
        </div>
      )}
    </div>
  )
}

export const BigRecordTile: React.FC<TileProps> = ({ status }) => {
  return (
    <div className="flex w-full h-full text-sm font-light border-r border-b border-gray-400 aspect-square"></div>
  )
}

export const BigEyeRecordTile: React.FC<TileProps> = ({ status }) => {
  return (
    <div className="flex w-full h-full text-sm font-light border-r border-b border-gray-400 aspect-square"></div>
  )
}

export const SmallRecordTile: React.FC<TileProps> = ({ status }) => {
  return (
    <div className="flex w-full h-full text-sm font-light border-r border-b border-gray-400 aspect-square"></div>
  )
}

export const CockroachRecordTile: React.FC<TileProps> = ({ status }) => {
  return (
    <div className="flex w-full h-full text-sm font-light border-r border-b border-gray-400 aspect-square"></div>
  )
}

export const BaseGrid: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative w-full h-full border-r border-b border-gray-500/90">
    <div className="grid grid-rows-6 grid-flow-col auto-cols-fr w-full h-full">
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
]
