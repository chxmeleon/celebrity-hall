import { RoomProps } from '@/types/room'
import { FormattedMessage, useIntl } from 'react-intl'
import { clsx as cx } from 'clsx'
import { CREATE_BACCARAT_BET, CANCEL_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { BetButton } from '@/components/common/Button'
import Timer from '@/components/room/Timer'
import PokerResult from '@/components/room/PockerResult'
import {
  BeadRoad,
  BigRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad,
  AskGridMobile
} from '@/components/room/Roadmap'
import RoomNotification from '@/components/room/RoomNotification'
import WinAndLoseResult from '@/components/room/WinAndLoseResult'
import { useCurrentGameState } from '@/hooks/rooms'
import { BetInitialValueProp, initialChipAmount } from '@/hooks/bet'
import RoomStreamMobile from '@/components/room/RoomStream/StreamMobile'
import SinglePlayerMobile from '@/components/room/BetDesk/SinglePlayerMobile'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Tooltip } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { ChipButtonList } from '@/pages/Rooms/[id]'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useEffect, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import GamePlayContext from '@/contexts/GamePlayContext'

type RoomDataProps = {
  room: RoomProps
}

const TableCardMobile: React.FC<RoomDataProps> = ({ room }) => {
  const { useGetRoomData, isTablesPath } = useContext(RoomDataContext)
  const { refetch: refetchRooms } = useGetRoomData('all')
  const href = `/home/rooms/${room.id}`
  const streamName = room?.streamName ?? room?.streams?.[0]?.name
  const streamKey = room?.streamKey ?? room?.streams?.[0]?.key
  const secoundStreamName = room?.streams?.[1]?.name ?? room?.streams?.[0]?.name
  const secoundStreamKey = room?.streams?.[1]?.key ?? room?.streams?.[0]?.key

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const {
    selectedChip,
    setSelectedChip,
    onConfirm,
    onRepeat,
    onCancel,
    btnState,
    dispatchBtn,
    dispatchBet,
    totalAmount
  } = useContext(GamePlayContext)

  const { formatMessage } = useIntl()

  const { currentGameState } = useCurrentGameState(room.id)
  const { gameState } = currentGameState

  useEffect(() => {
    if (gameState === 'START_BET' || gameState === 'UPDATE_AMOUNT') {
      dispatchBtn({ type: 'enableBet', totalAmount: totalAmount })
    } else if (gameState === 'CLOSE') {
      dispatchBtn({ type: 'setTrue', btnTarget: 'isDisable' })
      dispatchBet({ type: 'newRound' })
      refetchRooms?.()
    } else {
      dispatchBtn({ type: 'disableBet' })
    }
  }, [gameState, dispatchBet, totalAmount, refetchRooms, dispatchBtn])

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center py-1 px-2 w-full h-8 bg-theme-50/10 text-sm">
        <div className="font-bold text-gray-50">{room.name}</div>
        <div className="flex px-3 rounded-full border border-theme-300 text-theme-300">
          <Link to={href} key={href} className="m-auto text-center">
            <FormattedMessage
              id="screens.baccaratRooms.enterRoom"
              defaultMessage="Enter"
            />
          </Link>
        </div>
      </div>
      <div className="h-32"></div>
    </div>
  )
}

export default TableCardMobile
