import * as Road from './road'
import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { askMapper, askMapperMobile } from './data'
import { useCurrentGame } from '@/hooks/rooms'
import { useParams } from 'react-router-dom'
import { memo } from 'react'

const bigRoadLength = 30

export type GameResultType = 'player' | 'dealer' | 'tie'
export type PairResultType = 'player' | 'dealer' | 'none' | 'both'
export type BeadRoadProps = {
  result: string | null
  game_result: GameResultType
  pair_result: PairResultType
}
export const BeadRoadComponent: React.FC<{
  roads: (BeadRoadProps | null)[][]
}> = ({ roads }) => {
  return (
    <Road.BaseGrid>
      {roads.map((row, idx) => (
        <div className="flex" key={idx}>
          {row.map((road, index) => (
            <Road.BeadRoadTile key={index} road={road} />
          ))}
        </div>
      ))}
    </Road.BaseGrid>
  )
}
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
export const BigRoadComponent: React.FC<{
  roads: (BigRoadProps | null)[][]
  roadLength?: number
}> = ({ roads, roadLength = bigRoadLength }) => {
  return (
    <Road.BigRoadGrid>
      {roads.map((row, idx) => (
        <div className="flex" key={idx}>
          {[...row, ...Array(roadLength - row.length).fill(null)].map(
            (road, index) => (
              <Road.BigRecordTile key={index} road={road} />
            )
          )}
        </div>
      ))}
    </Road.BigRoadGrid>
  )
}
export const BigRoad = memo(
  BigRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export type RepetitionRoadProps = {
  repetition: boolean
}

export const BigEyeRoadComponent: React.FC<{
  roads: (RepetitionRoadProps | null)[][]
  roadLength?: number
  maxRowSize?: number
}> = ({ roads, roadLength, maxRowSize }) => {
  return (
    <Road.SmallRoadGrid>
      {roads.slice(0, maxRowSize).map((row, idx) => {
        const rowSize = row.length

        return (
          <div className="flex" key={idx}>
            {[
              ...row,
              ...Array((roadLength ?? rowSize) - rowSize).fill(null)
            ].map((road, index) => (
              <Road.BigEyeRecordTile key={index} road={road} />
            ))}
          </div>
        )
      })}
    </Road.SmallRoadGrid>
  )
}
export const BigEyeRoad = memo(
  BigEyeRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const SmallRoadComponent: React.FC<{
  roads: (RepetitionRoadProps | null)[][]
  maxColumnSize?: number
  maxRowSize?: number
}> = ({ roads, maxColumnSize, maxRowSize }) => {
  return (
    <Road.SmallRoadGrid>
      {roads.slice(0, maxRowSize).map((row, idx) => (
        <div className="flex" key={idx}>
          {row.slice(0, maxColumnSize).map((road, index) => (
            <Road.SmallRecordTile key={index} road={road} />
          ))}
        </div>
      ))}
    </Road.SmallRoadGrid>
  )
}
export const SmallRoad = memo(
  SmallRoadComponent,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

export const CockroachRoadComponent: React.FC<{
  roads: (RepetitionRoadProps | null)[][]
  maxColumnSize?: number
  maxRowSize?: number
}> = ({ roads, maxColumnSize, maxRowSize }) => {
  return (
    <Road.SmallRoadGrid>
      {roads.slice(0, maxRowSize).map((row, idx) => (
        <div className="flex" key={idx}>
          {row.slice(0, maxColumnSize).map((road, index) => (
            <Road.CockroachRecordTile key={index} road={road} />
          ))}
        </div>
      ))}
    </Road.SmallRoadGrid>
  )
}
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
    <div className="flex justify-between items-center w-full h-full bg-blue-800/20 ">
      {askMapperMobile.map((item, idx) => {
        return (
          <div key={`ask-${idx}`} className={cx('flex h-full items-center text-sm', item.className)}>
            <FormattedMessage
              id={item.contentId}
              defaultMessage={item.default}
            />
            <p className="pl-1 text-gray-100">{roadsTotalData?.[item?.value as string]}</p>
          </div>
        )
      })}
    </div>
  )
}
