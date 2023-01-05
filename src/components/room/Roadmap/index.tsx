import * as Road from './road'
import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'

export const BeadPlate: React.FC = () => {
  return (
    <Road.BaseGrid>
      {Road.winRecord.map((item, idx) => {
        return <Road.WinRecordTile key={`base-grid-${idx}`} status={item} />
      })}
    </Road.BaseGrid>
  )
}

export const BigRoad: React.FC = () => {
  return (
    <Road.BaseGrid>
      {Road.winRecord.map((item, idx) => {
        return <Road.BigRecordTile key={`big-${idx}`} status={item} />
      })}
    </Road.BaseGrid>
  )
}

export const SmallRoad = () => {
  return (
    <Road.BaseGrid>
      {Road.winRecord.map((item, idx) => {
        return <Road.SmallRecordTile key={`small-${idx}`} status={item} />
      })}
    </Road.BaseGrid>
  )
}

export const BigEyeRoad: React.FC = () => {
  return (
    <Road.BaseGrid>
      {Road.winRecord.map((item, idx) => {
        return <Road.BigEyeRecordTile key={`big-eye-${idx}`} status={item} />
      })}
    </Road.BaseGrid>
  )
}

export const CockroachRoad = () => {
  return (
    <Road.BaseGrid>
      {Road.winRecord.map((item, idx) => {
        return <Road.CockroachRecordTile key={`cockroach-${idx}`} status={item} />
      })}
    </Road.BaseGrid>
  )
}

const askMapper = [
  { contentId: 'common.dealer', default: 'Dealer', className: 'text-red-500' },
  { contentId: 'common.player', default: 'Player', className: 'text-blue-500' },
  { contentId: 'common.tie', default: 'Tie', className: 'text-teal-500' },
  {
    contentId: 'common.dealerPair',
    default: 'Dealer Pair',
    className: 'text-red-500'
  },
  {
    contentId: 'common.playerPair',
    default: 'Player Pair',
    className: 'text-blue-500'
  },
  {
    contentId: 'common.totalCount',
    default: 'Total',
    className: 'text-amber-500'
  },
  {
    contentId: 'common.dealerAsk',
    default: 'Dealer Ask',
    className: 'text-red-500',
    roundStyle: 'bg-red-500',
    borderStyle: 'border-red-500 border-2'
  },
  {
    contentId: 'common.playerAsk',
    default: 'Player Ask',
    className: 'text-blue-500',
    roundStyle: 'bg-blue-500',
    borderStyle: 'border-blue-500 border-2'
  }
]

export const AskGrid: React.FC = () => {
  const totalCount = [...new Array(8)].map(() => 1)

  return (
    <div className="grid grid-cols-1 w-full h-full border-r border-b grid-rows-8 border-gray-500/90">
      {totalCount.map((item, idx) => {
        const askGridContent = cx(
          'w-full h-full text-xs font-bold border-b border-gray-400 px-1.5 flex justify-between items-center',
          askMapper[idx].className
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
              <p>{item}</p>
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
