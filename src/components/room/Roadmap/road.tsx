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

export const roadBorderClassName = 'box-content border-gray-400'
const tileContainerClassName =
  'relative flex-1 text-xs font-light text-gray-50 before:content-[""] before:block before:w-full before:h-[0] before:pb-[100%]'
const tileWrapperClassName =
  'absolute w-full h-full top-0 left-0 flex justify-center items-center'
const tileContainerBorderClassName = 'border-r border-b'

const bigRoadTieClassName =
  'absolute flex justify-center items-center m-auto w-full h-[2.5px] bg-teal-600 -rotate-45 translate-y-0 aspect-square'

export const BigRoadTie: React.FC<{ tie_count: number | undefined }> = ({
  tie_count
}) => {
  return tie_count && tie_count !== 0 ? (
    <>
      {tie_count === 1 ? (
        <div className={bigRoadTieClassName}></div>
      ) : (
        <div className="text-xs font-medium text-teal-600">{tie_count}</div>
      )}
    </>
  ) : (
    <></>
  )
}

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
    <div
      className={cx(
        tileContainerClassName,
        tileContainerBorderClassName,
        roadBorderClassName
      )}
    >
      <div className={tileWrapperClassName}>
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

  console.log(road?.tie_count)

  return (
    <div
      className={cx(
        tileContainerClassName,
        tileContainerBorderClassName,
        roadBorderClassName
      )}
    >
      <div className={tileWrapperClassName}>
        <div className={bigRecordTileStyle}></div>
        <RoadTileDecoration pair_result={road?.pair_result} />
        <BigRoadTie tie_count={road?.tie_count} />
      </div>
    </div>
  )
}
export const BigRecordTile = memo(
  BigRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

type SmallRoadTileProps = {
  road: RepetitionRoadProps | null
  rightBorder?: boolean
  bottomBorder?: boolean
}
export const BigEyeRecordTileComponent: React.FC<SmallRoadTileProps> = ({
  road,
  rightBorder,
  bottomBorder
}) => {
  const bigRecordTileStyle = cx(
    'w-5/6 rounded-full aspect-square border',
    road
      ? outlineTileMapping[road.repetition ? 'dealer' : 'player'].className
      : 'border-transparent'
  )

  console.log(road)

  return (
    <div
      className={cx(
        tileContainerClassName,
        roadBorderClassName,
        rightBorder && 'border-r',
        bottomBorder && 'border-b'
      )}
    >
      <div className={tileWrapperClassName}>
        <div className={bigRecordTileStyle}></div>
      </div>
    </div>
  )
}
export const BigEyeRecordTile = memo(
  BigEyeRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const SmallRecordTileComponent: React.FC<SmallRoadTileProps> = ({
  road,
  rightBorder,
  bottomBorder
}) => {
  const smallRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[84%] h-[84%] rounded-full aspect-square',
    road
      ? fullRecordMapping[road.repetition ? 'dealer' : 'player'].className
      : null
  )

  return (
    <div
      className={cx(
        tileContainerClassName,
        roadBorderClassName,
        rightBorder && 'border-r',
        bottomBorder && 'border-b'
      )}
    >
      <div className={tileWrapperClassName}>
        <div className={smallRecordTileStyle}></div>
      </div>
    </div>
  )
}
export const SmallRecordTile = memo(
  SmallRecordTileComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const CockroachRecordTile: React.FC<SmallRoadTileProps> = ({
  road,
  rightBorder,
  bottomBorder
}) => {
  const cockroachRecordTileStyle = cx(
    'flex justify-center items-center m-auto w-[80%] h-[1px] -rotate-45 translate-y-0 aspect-square',
    road
      ? fullRecordMapping[road.repetition ? 'dealer' : 'player'].className
      : null
  )

  return (
    <div
      className={cx(
        tileContainerClassName,
        roadBorderClassName,
        rightBorder && 'border-r',
        bottomBorder && 'border-b'
      )}
    >
      <div className={tileWrapperClassName}>
        <div className={cockroachRecordTileStyle}></div>
      </div>
    </div>
  )
}

const roadGridClassName = 'relative block w-full'
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
