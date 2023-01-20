import { clsx as cx } from 'clsx'
import { memo, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  BeadRoadProps,
  BigRoadProps,
  PairResultType,
  RepetitionRoadProps
} from '.'
import { fullRecordMapping, outlineTileMapping, roadTileMapping } from './data'

const roadTileDecorationClassName = 'absolute w-[6px] h-[6px] rounded-full'
const playerPairLocationClassName = 'right-[1px] bottom-[1px]'
const dealerPairLocationClassName = 'left-[1px] top-[1px]'

export const roadBorderClassName = 'box-border border-gray-400'
const tileContainerClassName =
  'relative flex w-full h-full text-xs font-light text-gray-50 border-r border-b aspect-square'

export const RoadTileDecoration: React.FC<{
  pair_result: PairResultType | undefined
}> = ({ pair_result }) => {
  return pair_result && pair_result !== 'none' ? (
    <>
      {pair_result === 'both' ? (
        <>
          <div
            className={cx(
              roadTileDecorationClassName,
              roadTileMapping['player'].className,
              playerPairLocationClassName
            )}
          ></div>

          <div
            className={cx(
              roadTileDecorationClassName,
              roadTileMapping['dealer'].className,
              dealerPairLocationClassName
            )}
          ></div>
        </>
      ) : (
        <div
          className={cx(
            roadTileDecorationClassName,
            roadTileMapping[pair_result].className,
            pair_result === 'player'
              ? playerPairLocationClassName
              : dealerPairLocationClassName
          )}
        ></div>
      )}
    </>
  ) : (
    <></>
  )
}

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
    <div className={cx(tileContainerClassName, roadBorderClassName)}>
      <div className={winRecordTileStyle}>
        {road?.game_result && (
          <FormattedMessage
            id={roadTileMapping[road.game_result].translationId}
            defaultMessage={road.game_result}
          />
        )}
        <RoadTileDecoration pair_result={road?.pair_result} />
      </div>
    </div>
  )
}
export const BeadRoadTile = memo(
  BeadRoadTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const BigRecordTileComponent: React.FC<{
  road: BigRoadProps | null
}> = ({ road }) => {
  const bigRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square border-2',
    road?.game_result
      ? outlineTileMapping[road.game_result]?.className
      : 'border-transparent'
  )

  return (
    <div className={cx(tileContainerClassName, roadBorderClassName)}>
      <div className={bigRecordTileStyle}></div>
      <RoadTileDecoration pair_result={road?.pair_result} />
    </div>
  )
}
export const BigRecordTile = memo(
  BigRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const BigEyeRecordTileComponent: React.FC<{
  road: RepetitionRoadProps | null
}> = ({ road }) => {
  const bigRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-5/6 h-5/6 rounded-full aspect-square border-2',
    road
      ? outlineTileMapping[road.repetition ? 'dealer' : 'player'].className
      : 'border-transparent'
  )
  return (
    <div className={cx(tileContainerClassName, roadBorderClassName)}>
      <div className={bigRecordTileStyle}></div>
    </div>
  )
}
export const BigEyeRecordTile = memo(
  BigEyeRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const SmallRecordTileComponent: React.FC<{
  road: RepetitionRoadProps | null
}> = ({ road }) => {
  const smallRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[84%] h-[84%] rounded-full aspect-square',
    road
      ? fullRecordMapping[road.repetition ? 'dealer' : 'player'].className
      : null
  )

  return (
    <div className={cx(tileContainerClassName, roadBorderClassName)}>
      <div className={smallRecordTileStyle}></div>
    </div>
  )
}
export const SmallRecordTile = memo(
  SmallRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const CockroachRecordTile: React.FC<{
  road: RepetitionRoadProps | null
}> = ({ road }) => {
  const cockroachRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[80%] h-[1px] -rotate-45 translate-y-0 aspect-square',
    road
      ? fullRecordMapping[road.repetition ? 'dealer' : 'player'].className
      : null
  )

  return (
    <div className={cx(tileContainerClassName, roadBorderClassName)}>
      <div className={cockroachRecordTileStyle}></div>
    </div>
  )
}

const roadGridClassName = 'relative w-full'
type GridProps = React.PropsWithChildren<{
  className?: string
}>
export const BaseGrid: React.FC<GridProps> = ({ className, children }) => (
  <div className={cx(roadGridClassName, roadBorderClassName, className)}>
    {children}
  </div>
)
export const BigRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => <div className={cx(roadGridClassName)}>{children}</div>
export const SmallRoadGrid: React.FC<React.PropsWithChildren> = ({
  children
}) => <div className={cx(roadGridClassName)}>{children}</div>
