import { useIntl } from 'react-intl'
import { clsx as cx } from 'clsx'
import { useContext } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'


type NoticeProps = {
  isConfirmedSuccess: boolean
  isConfirmedFailure: boolean
  isRepeatSuccess: boolean
  gameState: string | any
}

const RoomNotification: React.FC<NoticeProps> = ({
  isConfirmedSuccess,
  isConfirmedFailure,
  isRepeatSuccess,
  gameState
}) => {
  const { formatMessage } = useIntl()
  const { isTable } = useContext(RoomDataContext)

  return (
    <>
      {isConfirmedSuccess || isRepeatSuccess ? (
        <div className="flex w-full h-12 md:w-2/3">
          <div className="flex p-2 py-1 m-auto w-3/4 rounded-md bg-green-400/95">
            <p
              className={cx(
                'm-auto font-medium text-teal-900',
                isTable ? 'text-sm' : 'text-lg md:text-2xl'
              )}
            >
              {formatMessage({
                defaultMessage: 'Bet Success',
                id: 'screens.records.betSuccess'
              })}
            </p>
          </div>
        </div>
      ) : isConfirmedFailure ? (
        <div className="flex w-full h-12 md:w-2/3">
          <div className="flex p-2 py-3 m-auto w-full rounded-md md:w-3/4 bg-red-800/95">
            <p
              className={cx(
                'm-auto font-medium text-red-400',
                isTable ? 'text-[9px]' : 'text-xs md:text-[14px]'
              )}
            >
              {formatMessage({
                defaultMessage: 'Bet Failed',
                id: 'screens.records.betfailed'
              })}
            </p>
          </div>
        </div>
      ) : gameState === noticeMapper?.[gameState]?.state &&
        gameState !== undefined ? (
        <div className="flex w-full h-12 md:w-2/3">
          <div className="flex py-1 m-auto w-3/4 rounded-md bg-yellow-400/95">
            <div
              className={cx(
                'm-auto  font-medium text-theme-50',
                isTable ? 'text-sm' : 'text-lg md:text-2xl'
              )}
            >
              {formatMessage({
                defaultMessage: noticeMapper?.[gameState]?.default,
                id: noticeMapper?.[gameState]?.id
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default RoomNotification



const noticeMapper = {
  START_BET: {
    state: 'START_BET',
    id: 'status.baccarat.START_BET',
    default: 'Start Bet'
  },
  STOP_BET: {
    state: 'STOP_BET',
    id: 'status.baccarat.STOP_BET',
    default: 'Stop Bet'
  },
  DRAW: {
    state: 'DRAW',
    id: 'status.baccarat.DRAW',
    default: 'drawing'
  },
  CLOSE: {
    state: 'CLOSE',
    id: 'status.baccarat.CLOSE',
    default: 'Closed'
  },
  SHUFFLE: {
    state: 'SHUFFLE',
    id: 'status.baccarat.SHUFFLE',
    default: 'Shuffling'
  },
  SOS: {
    state: 'SOS',
    id: 'status.baccarat.SOS',
    default: 'Maintaining'
  },
  SOS_RECOVER: {
    state: 'SOS_RECOVER',
    id: 'status.baccarat.SOS_RECOVER',
    default: 'Maintain Finished, Shuffling'
  },
  MAINTAIN: {
    state: 'MAINTAIN',
    id: 'status.baccarat.MAINTAIN',
    default: 'Maintaining'
  },
  PLAYER_DRAW_THIRD: {
    state: 'PLAYER_DRAW_THIRD',
    id: 'status.baccarat.player_third_opening',
    default: 'Drawing'
  },
  DEALER_DRAW_THIRD: {
    state: 'DEALER_DRAW_THIRD',
    id: 'status.baccarat.dealer_third_opening',
    default: 'Drawing'
  }
}


