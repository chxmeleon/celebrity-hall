import { useCurrentGameState } from '@/hooks/rooms'
import React from 'react'
import { FormattedMessage } from 'react-intl'
useCurrentGameState

type NoticeProps = {
  isConfirmedSuccess: boolean
  isCanceledSuccess: boolean
  isRepeatSuccess: boolean
  WinAndLoseData: { [key: string]: string }
}

const RoomNotification: React.FC<NoticeProps> = ({
  isConfirmedSuccess,
  isCanceledSuccess,
  isRepeatSuccess,
  WinAndLoseData
}) => {
  return (
    <div className="flex w-1/2 h-12 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-md">
      <p className="m-auto text-lg text-cyan-50">
        <FormattedMessage
          id="screens.records.betSuccess"
          defaultMessage="Bet Success"
        />
      </p>
    </div>
  )
}

export default RoomNotification
