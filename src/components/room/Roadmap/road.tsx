import { clsx as cx } from 'clsx'
import { memo, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { BeadRoadProps, BigRoadProps } from '.'
import {
  fullRecordMapper,
  outlineRecordMapper,
  outlineTileMapping,
  roadTileMapping
} from './data'

type TileProps = {
  status: string
}

const playerPairLocationClassName = 'right-[2px] bottom-[2px]'
const dealerPairLocationClassName = 'left-[2px] top-[2px]'

const tileContainer = cx(
  'relative flex w-full h-full text-xs font-light text-gray-50 border-r border-b border-gray-400 aspect-square'
)

export const BeadRoadTileComponent: React.FC<{
  road: BeadRoadProps | null
}> = ({ road }) => {
  const winRecordTileStyle = useMemo(
    () =>
      cx(
        'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square',
        road?.game_result ? roadTileMapping[road?.game_result]?.className : null
      ),
    [road]
  )

  return (
    <div className={tileContainer}>
      <div className={winRecordTileStyle}>
        {road?.game_result && (
          <FormattedMessage
            id={roadTileMapping[road.game_result].translationId}
            defaultMessage={road.game_result}
          />
        )}

        {road?.pair_result && road.pair_result !== 'none' && (
          <>
            {road.pair_result === 'both' ? (
              <>
                <div
                  className={cx(
                    'absolute w-[8px] h-[8px] rounded-full',
                    roadTileMapping['player'].className,
                    playerPairLocationClassName
                  )}
                ></div>

                <div
                  className={cx(
                    'absolute w-[8px] h-[8px] rounded-full',
                    roadTileMapping['dealer'].className,
                    dealerPairLocationClassName
                  )}
                ></div>
              </>
            ) : (
              <div
                className={cx(
                  'absolute w-[8px] h-[8px] rounded-full',
                  roadTileMapping[road.pair_result].className,
                  road.pair_result === 'player'
                    ? playerPairLocationClassName
                    : dealerPairLocationClassName
                )}
              ></div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export const BeadRoadTile = memo(
  BeadRoadTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const BigRecordTile: React.FC<{
  road: BigRoadProps | null
}> = ({ road }) => {
  const bigRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square border-2',
    road?.game_result
      ? outlineTileMapping[road.game_result]?.className
      : 'border-transparent'
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
  <div className="relative w-full h-full border-gray-500/90">
    {children}
  </div>
)

export const BigRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <div className="relative w-full h-full border-gray-500/90">
    <div>{children}</div>
  </div>
)

export const SmallRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <div className="relative w-full h-full border-r border-gray-500/90">
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
