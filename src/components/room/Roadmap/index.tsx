import * as Road from './road'
import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { askMapper, askMapperMobile } from './data'
import { useCurrentGame } from '@/hooks/rooms'
import { useParams } from 'react-router-dom'
import React, { memo, useEffect, useState } from 'react'

export type GameResultType = 'player' | 'dealer' | 'tie'
export type PairResultType = 'player' | 'dealer' | 'none' | 'both'
export type RoadComponentProps<T> = {
  roads: (T | null)[][]
  className?: string
  columnSize?: number
  rowSize?: number
}
export type BaseRoadComponentProps<T> = {
  roads: (T | null)[][]
  size?: 'small' | 'default'
  className?: string
  columnSize?: number
  rowSize?: number
  TileComponent: React.FC<{
    road: T | null
    rightBorder?: boolean
    bottomBorder?: boolean
  }>
}
function BaseRoadComponent<T>({
  roads,
  size,
  className,
  columnSize,
  rowSize,
  TileComponent
}: BaseRoadComponentProps<T>) {
  const lastColumnSizeIndex = roads?.[0].findIndex(
    (v) => v === null && v === undefined
  )

  let offsetIndex = (columnSize ?? 0) 
  if (
    lastColumnSizeIndex > (columnSize ?? 0) &&
    lastColumnSizeIndex % (columnSize ?? 0) === 0
  ) {
    offsetIndex = lastColumnSizeIndex 
  }

  let offset = 0
  if (
    roads?.[0]?.[offsetIndex] !== null &&
    roads?.[0]?.[offsetIndex] !== undefined
  ) {
    offset += columnSize ?? 0
  }

  console.log('lastIndex:', lastColumnSizeIndex)
  console.log('offsetIndex:', offsetIndex)
  console.log('columnSize:', columnSize)
  console.log('range:', offset, (columnSize as number) + offset)

  return (
    <Road.BaseGrid className={className}>
      {roads.slice(0, rowSize).map((row, idx) => {
        const emptyTileLength = (columnSize ?? row.length) - row.length
        const emptyTileSize = emptyTileLength >= 0 ? emptyTileLength : 0

        return (
          <div className="flex w-full" key={idx}>
            {[
              ...row,
              ...Array(emptyTileSize).fill(null),
              ...Array(offset).fill(null)
            ]
              .slice(offset, (columnSize as number) + offset)
              .map((road, index) => {
                const tileProps =
                  size === 'small'
                    ? {
                        road,
                        rightBorder: index % 2 === 1,
                        bottomBorder: idx % 2 === 1
                      }
                    : { road }
                return <TileComponent key={index} {...tileProps} />
              })}
          </div>
        )
      })}
    </Road.BaseGrid>
  )
}

export type BeadRoadProps = {
  result: string | null
  game_result: GameResultType
  pair_result: PairResultType
}

export const BeadRoadComponent: React.FC<RoadComponentProps<BeadRoadProps>> = (
  props
) => <BaseRoadComponent {...props} TileComponent={Road.BeadRoadTile} />
export const BeadRoad = memo(
  BeadRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export type BigRoadProps = {
  game_result: GameResultType
  pair_result: PairResultType
  order: number
  result: number
  tie_count: number
}
export const BigRoadComponent: React.FC<RoadComponentProps<BigRoadProps>> = (
  props
) => <BaseRoadComponent {...props} TileComponent={Road.BigRecordTile} />

export const BigRoad = memo(
  BigRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export type RepetitionRoadProps = {
  repetition: boolean
}

export const BigEyeRoadComponent: React.FC<
  RoadComponentProps<RepetitionRoadProps>
> = (props) => (
  <BaseRoadComponent
    {...props}
    size="small"
    TileComponent={Road.BigEyeRecordTile}
  />
)
export const BigEyeRoad = memo(
  BigEyeRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const SmallRoadComponent: React.FC<
  RoadComponentProps<RepetitionRoadProps>
> = (props) => (
  <BaseRoadComponent
    {...props}
    size="small"
    TileComponent={Road.SmallRecordTile}
  />
)
export const SmallRoad = memo(
  SmallRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const CockroachRoadComponent: React.FC<
  RoadComponentProps<RepetitionRoadProps>
> = (props) => (
  <BaseRoadComponent
    {...props}
    size="small"
    TileComponent={Road.CockroachRecordTile}
  />
)
export const CockroachRoad = memo(
  CockroachRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const AskGrid: React.FC = () => {
  const totalCount = [...new Array(8)].map(() => 1)
  const { id } = useParams()
  const { currentGame } = useCurrentGame(id)
  const roadsTotalData = currentGame?.baccaratRoom?.roads ?? ''

  return (
    <div className="grid grid-cols-1 w-full h-full border-r grid-rows-8 border-gray-500/90">
      {totalCount?.map((item, idx) => {
        const key = askMapper[idx].value
        const askGridContent = cx(
          'w-full h-full text-xs font-bold border-b border-gray-400 px-1.5 flex justify-between items-center',
          askMapper[idx].className,
          idx === 6
            ? ' hover:cursor-pointer hover:bg-red-100 active:bg-red-200'
            : '',
          idx === 7
            ? ' hover:cursor-pointer hover:bg-blue-100 active:bg-blue-200'
            : ''
        )

        const askRoundStyle = cx(
          'w-3 h-3 rounded-full',
          askMapper[idx]?.roundStyle
        )

        const askBorderStyle = cx(
          'w-3 h-3 rounded-full',
          askMapper[idx]?.borderStyle
        )

        const askLineStyle = cx(
          'w-3 h-[1px] -rotate-45',
          askMapper[idx]?.roundStyle
        )

        return (
          <div key={`ask-${idx}`} className={askGridContent}>
            <FormattedMessage
              id={askMapper[idx].contentId}
              defaultMessage={askMapper[idx].default}
            />
            {idx < 6 ? (
              <p>{roadsTotalData?.[key as string]}</p>
            ) : (
              <div className="w-[44%] h-full flex justify-between items-center">
                <div className={askBorderStyle}></div>
                <div className={askRoundStyle}></div>
                <div className={askLineStyle}> </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const AskGridMobile = () => {
  const { id } = useParams()
  const { currentGame } = useCurrentGame(id)
  const roadsTotalData = currentGame?.baccaratRoom?.roads ?? ''

  return (
    <div className="flex justify-between items-center w-full h-full bg-blue-800/20">
      {askMapperMobile.map((item, idx) => {
        return (
          <div
            key={`ask-${idx}`}
            className={cx(
              'flex h-full items-center text-xs md:text-sm',
              item.className
            )}
          >
            <FormattedMessage
              id={item.contentId}
              defaultMessage={item.default}
            />
            <p className="pl-1 text-gray-100">
              {roadsTotalData?.[item?.value as string]}
            </p>
          </div>
        )
      })}
    </div>
  )
}
