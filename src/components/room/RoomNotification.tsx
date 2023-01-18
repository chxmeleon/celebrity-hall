import React from 'react'
import { useIntl } from 'react-intl'

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

type NoticeProps = {
  isConfirmedSuccess: boolean
  isRepeatSuccess: boolean
  gameState: string | any
}

const RoomNotification: React.FC<NoticeProps> = ({
  isConfirmedSuccess,
  isRepeatSuccess,
  gameState
}) => {
  const { formatMessage } = useIntl()
  
  return (
    <>
      {isConfirmedSuccess || isRepeatSuccess ? (
        <div className="flex w-1/2 h-12 rounded-md bg-teal-600/95">
          <p className="m-auto text-2xl font-medium text-white">
            {formatMessage({
              defaultMessage: 'Bet Success',
              id: 'screens.records.betSuccess'
            })}
          </p>
        </div>
      ) : null}
      {gameState === noticeMapper?.[gameState]?.state && gameState !== undefined ? (
        <div className="flex w-1/2 h-12 rounded-md bg-yellow-300/95">
          <div className="m-auto text-2xl font-medium text-theme-50">
            {formatMessage({
              defaultMessage: noticeMapper?.[gameState]?.default,
              id: noticeMapper?.[gameState]?.id
            })}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default RoomNotification
