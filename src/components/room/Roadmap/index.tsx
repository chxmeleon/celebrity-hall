import * as Road from './road'
import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { askMapper } from './data'
import { useCurrentGame } from '@/hooks/rooms'
import { useParams } from 'react-router-dom'

export type GameResultType = 'player' | 'dealer' | 'tie'
export type PairResultType = 'player' | 'dealer' | 'none'
export type BeadRoadProps = {
  result: string | null
  game_result: GameResultType
  pair_result: PairResultType
}
export const BeadRoad: React.FC<{ roads: (BeadRoadProps | null)[][] }> = ({
  roads
}) => {
  return (
    <Road.BaseGrid>
      {roads.map((row, idx) => (
        <div className='flex' key={idx}>
          {row.map((road, index) => (
            <Road.BeadRoadTile key={index} road={road} />
          ))}
        </div>
      ))}
    </Road.BaseGrid>
  )
}

export const BigRoad: React.FC = () => {
  return (
    <Road.BigRoadGrid>
      {Road.bigArray.map((item, idx) => {
        return <Road.BigRecordTile key={`big-${idx}`} status={item} />
      })}
    </Road.BigRoadGrid>
  )
}

export const SmallRoad: React.FC = () => {
  return (
    <Road.SmallRoadGrid>
      {Road.smallArray.map((item, idx) => {
        return <Road.SmallRecordTile key={`small-${idx}`} status={item} />
      })}
    </Road.SmallRoadGrid>
  )
}

export const BigEyeRoad: React.FC = () => {
  return (
    <Road.SmallRoadGrid>
      {Road.smallArray.map((item, idx) => {
        return <Road.BigEyeRecordTile key={`big-eye-${idx}`} status={item} />
      })}
    </Road.SmallRoadGrid>
  )
}

export const CockroachRoad = () => {
  return (
    <Road.SmallRoadGrid>
      {Road.smallArray.map((item, idx) => {
        return (
          <Road.CockroachRecordTile key={`cockroach-${idx}`} status={item} />
        )
      })}
    </Road.SmallRoadGrid>
  )
}

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
