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

const TableCard: React.FC<RoomDataProps> = ({ room }) => {
  const { refetchRooms, isTablesPath } = useContext(RoomDataContext)
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
    totalAmount,
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
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center py-1 px-2 w-full h-12 bg-theme-50/10">
        <div className="font-bold text-gray-50">{room.name}</div>
        <div className="flex px-3 rounded-full border border-theme-300 text-theme-300">
          <Link to={href} key={href} className="m-auto text-center">
            <FormattedMessage
              id="screens.baccaratRooms.enterRoom"
              defaultMessage="Enter"
            />
          </Link>
        </div>
        {/* <div className="inline-flex justify-between items-center w-[42%]"> */}
          {/* <div className="flex px-3 text-gray-100 rounded-full border border-gray-100"> */}
          {/*   <div className="m-auto"> */}
          {/*     <FormattedMessage id="common.tables" defaultMessage="Enter" /> */}
          {/*   </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
      <div className="relative w-full h-[266px]">
        <div className="absolute w-full h-full">
          <div className="grid absolute z-20 grid-cols-3 grid-rows-2 w-full h-full">
            <div className="flex pl-1">
              <div className="flex flex-col justify-around items-end h-[72px]">
                <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                  <Tooltip
                    content={formatMessage({
                      id: 'components.stream.camSwitch',
                      defaultMessage: 'Switch Line'
                    })}
                    placement="right"
                  >
                    <button
                      onClick={handleSwitchCam}
                      className={`${
                        isSecondCam ? 'text-theme-300' : ''
                      } m-auto text-xl i-heroicons-video-camera-20-solid`}
                    ></button>
                  </Tooltip>
                </div>
                <div className="flex p-1 w-8 h-8 rounded-md bg-theme-50/80">
                  <Tooltip
                    content={formatMessage({
                      id: 'components.stream.streamSwitch',
                      defaultMessage: 'Switch Line'
                    })}
                    placement="right"
                  >
                    <button
                      onClick={handleSwitchStream}
                      className={`${
                        isWebRTC ? 'text-theme-300' : ''
                      } m-auto text-xl i-heroicons-wifi-20-solid`}
                    ></button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div></div>
            <div className="flex m-auto w-14 aspect-square">
              <Timer roomId={room.id} />
            </div>
            <div></div>
            <div className="flex col-span-2 justify-end pb-1 w-full h-full">
              <div className="flex flex-col justify-end items-end w-full">
                <RoomNotification
                  isConfirmedSuccess={btnState.isConfirmSuccess}
                  isConfirmedFailure={btnState.isConfirmFailure}
                  isRepeatSuccess={btnState.isRepeatSuccess}
                  isTablesPath={isTablesPath}
                  gameState={gameState}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-full">
            {isSecondCam && secoundStreamName && secoundStreamKey ? (
              <RoomStreamMobile
                streamName={secoundStreamName}
                streamKey={secoundStreamKey}
                videoOn={true}
                isWebRTC={isWebRTC}
                isTablesPath={isTablesPath}
              />
            ) : streamName && streamKey ? (
              <RoomStreamMobile
                streamName={streamName}
                streamKey={streamKey}
                videoOn={true}
                isWebRTC={isWebRTC}
                isTablesPath={isTablesPath}
              />
            ) : <Loading />}
          </div>
        </div>
      </div>

      <div className="relative w-full h-10">
        <div className="flex absolute top-1.5 z-30 justify-center w-full pointer-events-none">
          <WinAndLoseResult gameState={gameState} />
        </div>
        <div className="inline-flex items-center px-2 h-full text-xs">
          <span>
            <FormattedMessage id="screens.room.bet" />
          </span>
          <span className="px-2">|</span>
          <span>{totalAmount?.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex relative flex-col w-full h-1/2">
        <div className="absolute z-30 w-full h-full pointer-events-none">
          <div className="pb-14 px-2 w-full h-full">
            <PokerResult roomId={room.id} isTablesPath={isTablesPath} />
          </div>
        </div>

        <div className="h-1/2">
          <SinglePlayerMobile isDisabled={btnState.isDisable} />
        </div>

        <div className="flex flex-col w-full h-1/2">
          <div className="grid grid-cols-4 grid-rows-2 px-5 py-2.5 w-full gap-2">
            <ChipButtonList
              selectedChip={selectedChip}
              onSelectedChipChanged={setSelectedChip}
            />
          </div>
          <div className="flex justify-between items-center px-1 pt-1.5 pb-2.5 w-full">
            <BetButton
              className="mx-1 text-md"
              isDisabled={btnState.isCancelDisabled}
              onClick={() => onCancel(room.id)}
            >
              <div className="i-heroicons-x-mark-solid"></div>
              <FormattedMessage id="common.cancel" />
            </BetButton>
            <BetButton
              className="mx-1 text-md"
              isDisabled={btnState.isRepeatDisabled}
              onClick={() => onRepeat(room?.id)}
            >
              <div className="i-heroicons-arrow-path-solid"></div>
              <FormattedMessage id="common.repeat" />
            </BetButton>
            <BetButton
              className="mx-1 text-md"
              isDisabled={btnState.isConfirmDisabled}
              onClick={(e) => onConfirm(e, room?.id)}
            >
              <div className="i-heroicons-check-solid"></div>
              <FormattedMessage id="common.confirm" />
            </BetButton>
          </div>
        </div>
      </div>

      <div className="flex relative flex-col w-full">
        <div className="flex w-full bg-gray-50">
          <div className="w-[39%]">
            {room && (
              <BeadRoad columnSize={6} roads={room.roads.bead_road.array} />
            )}
          </div>
          <div className="w-[62.2%]">
            {room && (
              <BigRoad columnSize={14} roads={room.roads.big_road.array} />
            )}
            <div className="flex w-full h-2/5">
              <div className="w-1/3">
                {room && (
                  <BigEyeRoad
                    columnSize={10}
                    roads={room.roads.big_eye_road.graph}
                  />
                )}
              </div>
              <div className="w-1/3">
                {room && (
                  <SmallRoad
                    columnSize={10}
                    roads={room.roads.small_road.graph}
                  />
                )}
              </div>
              <div className="w-1/3">
                {room && (
                  <CockroachRoad
                    columnSize={10}
                    roads={room.roads.cockroach_road.graph}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[29px]">
          <AskGridMobile />
        </div>
      </div>
    </div>
  )
}

export default TableCard
