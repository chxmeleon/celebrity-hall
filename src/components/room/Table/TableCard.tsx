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
import GamePlayContext from '@/contexts/GamePlayContext'
import { useCurrentGameState } from '@/hooks/rooms'
import { BetInitialValueProp, betInitialValue } from '@/hooks/bet'
import RoomStreamMobile from '@/components/room/RoomStream/StreamMobile'
import SinglePlayerMobile from '@/components/room/BetDesk/SinglePlayerMobile'
import Loading from '@/components/room/RoomStream/Loading'
import { Tooltip } from '@material-tailwind/react'
import { Link, useLocation } from 'react-router-dom'
import { ChipButtonList } from '@/pages/Rooms/[id]'
import { useAuth } from '@/contexts/AuthContext'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useEffect, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'


type RoomDataProps = {
  room: RoomProps
}

const TableCard: React.FC<RoomDataProps> = ({ room }) => {
  const { refetchRooms } = useContext(RoomDataContext)
  const href = `/home/rooms/${room.id}`
  const { isTrial } = useAuth()
  const streamName = room?.streams?.[0]?.name
  const streamKey = room?.streams?.[0]?.key
  const secoundStreamName = room?.streamName
  const secoundStreamKey = room?.streamKey

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const [isChangedDesk, setIsChangedDesk] = useState<boolean>(false)
  const handleSwitchDesk = () => setIsChangedDesk(!isChangedDesk)

  const { selectedChip, setSelectedChip, betState, dispatchBet, wallet } =
    useContext(GamePlayContext)

  const { currentGameState } = useCurrentGameState(room.id)
  const { gameState } = currentGameState
  const [isDisable, setIsDisable] = useState(true)
  const { deviceInfo } = useSetup()

  const { formatMessage } = useIntl()

  const [createBaccaratBet] = useMutation<
    types.CREATE_BACCARAT_BET,
    types.CREATE_BACCARAT_BETVariables
  >(CREATE_BACCARAT_BET)

  const [cancelBaccaratBet] = useMutation<
    types.CANCEL_BACCARAT_BET,
    types.CANCEL_BACCARAT_BETVariables
  >(CANCEL_BACCARAT_BET)

  const totalAmount =
    betState?.playerAmount +
    betState?.playerPairAmount +
    betState?.dealerAmount +
    betState?.dealerPairAmount +
    betState?.smallAmount +
    betState?.bigAmount +
    betState?.tieAmount +
    betState?.super6Amount

  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false)
  const [isCancelDisabled, setIsCancelDisabled] = useState(false)
  const [isRepeatDisabled, setIsRepeatDisabled] = useState(false)
  const [preBetState, setPreBetState] =
    useState<BetInitialValueProp>(betInitialValue)

  const [isCancelSuccess, setIsCancelSuccess] = useState(false)
  const onCancel = async () => {
    dispatchBet({ type: 'newRound' })
    if (totalAmount > 0 || isCancelDisabled) {
      const result = await cancelBaccaratBet({
        variables: {
          input: {
            baccaratRoomId: room.id
          }
        }
      })
      setIsCancelSuccess(result.errors?.length === 0)
    }
    setIsConfirmDisabled(false)
    setIsRepeatDisabled(false)
    setIsCancelDisabled(true)
  }

  const [isConfirmSuccess, setIsConfirmSuccess] = useState(false)
  const [isConfirmFailure, setIsConfirmFailure] = useState(false)
  const onConfirmBet = async (e: React.MouseEvent) => {
    if (totalAmount >= 0 && totalAmount <= wallet?.balance) {
      try {
        const result = await createBaccaratBet({
          variables: {
            input: {
              baccaratRoomId: room.id,
              playerAmount: betState?.playerAmount,
              dealerAmount: betState?.dealerAmount,
              playerPairAmount: betState?.playerPairAmount,
              dealerPairAmount: betState?.dealerPairAmount,
              tieAmount: betState?.tieAmount,
              super6Amount: betState?.super6Amount,
              smallAmount: betState?.smallAmount,
              bigAmount: betState?.bigAmount,
              deviceInfo: JSON.stringify(deviceInfo)
            }
          }
        })
        if (result?.data?.createBaccaratBet?.errors?.length === 0) {
          setIsConfirmSuccess(true)
        } else {
          setIsConfirmFailure(true)
        }
        setIsConfirmDisabled(true)
        setIsRepeatDisabled(true)
        setPreBetState(betState)
      } catch (err) {
        console.log(err)
      }
      setTimeout(() => {
        setIsConfirmSuccess(false)
        setIsConfirmFailure(false)
      }, 1500)
    } else {
      e.preventDefault()
    }
  }

  const [isRepeatSuccess, setIsRepeatSuccess] = useState(false)
  const onRepeat = async () => {
    dispatchBet({ type: 'repeat', preState: preBetState })
    try {
      const result = await createBaccaratBet({
        variables: {
          input: {
            baccaratRoomId: room.id,
            playerAmount: preBetState?.playerAmount,
            dealerAmount: preBetState?.dealerAmount,
            playerPairAmount: preBetState?.playerPairAmount,
            dealerPairAmount: preBetState?.dealerPairAmount,
            tieAmount: preBetState?.tieAmount,
            super6Amount: preBetState?.super6Amount,
            smallAmount: preBetState?.smallAmount,
            bigAmount: preBetState?.bigAmount,
            deviceInfo: JSON.stringify(deviceInfo)
          }
        }
      })
      if (result?.data?.createBaccaratBet?.errors?.length === 0) {
        setIsRepeatSuccess(true)
      } else {
        setIsConfirmFailure(true)
      }
      setIsCancelDisabled(false)
      setIsRepeatDisabled(true)
      setIsConfirmDisabled(true)
    } catch (err) {
      console.log(err)
    }
    setTimeout(() => {
      setIsRepeatSuccess(false)
      setIsConfirmFailure(false)
    }, 1500)
  }

  useEffect(() => {
    if (gameState === 'START_BET' || gameState === 'UPDATE_AMOUNT') {
      setIsDisable(false)
      setIsRepeatDisabled(false)
      setIsConfirmDisabled(false)
      if (totalAmount > 0) {
        setIsCancelDisabled(false)
      }
    } else if (gameState === 'CLOSE') {
      setIsDisable(true)
      dispatchBet({ type: 'newRound' })
      refetchRooms?.()
    } else {
      setIsDisable(true)
      setIsConfirmDisabled(true)
      setIsRepeatDisabled(true)
      setIsCancelDisabled(true)
    }
  }, [gameState, dispatchBet, totalAmount, refetchRooms])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center py-1 px-2 w-full h-12 bg-theme-50/10">
        <div className="font-bold text-gray-50">{room.name}</div>
        <div className="inline-flex justify-between items-center w-[42%]">
          <div className="flex px-3 rounded-full border border-theme-300 text-theme-300">
            <Link to={href} key={href} className="m-auto text-center">
              <FormattedMessage
                id="screens.baccaratRooms.enterRoom"
                defaultMessage="Enter"
              />
            </Link>
          </div>
          <div className="flex px-3 text-gray-100 rounded-full border border-gray-100">
            <div className="m-auto">
              <FormattedMessage id="common.tables" defaultMessage="Enter" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[251px]">
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
                  isConfirmedSuccess={isConfirmSuccess}
                  isConfirmedFailure={isConfirmFailure}
                  isRepeatSuccess={isRepeatSuccess}
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
              />
            ) : streamName && streamKey ? (
              <RoomStreamMobile
                streamName={streamName}
                streamKey={streamKey}
                videoOn={true}
                isWebRTC={isWebRTC}
              />
            ) : null}
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

      <div className="flex relative flex-col w-full">
        <div className="absolute z-30 w-full h-full pointer-events-none">
          <div className="pb-2 px-2 w-full h-full">
            <PokerResult roomId={room.id} />
          </div>
        </div>

        <SinglePlayerMobile isDisabled={isDisable} />

        <div className="flex flex-col w-full">
          <div className="flex justify-around p-2 py-2.5 w-full gap-2">
            <ChipButtonList
              selectedChip={selectedChip}
              onSelectedChipChanged={setSelectedChip}
            />
          </div>
          <div className="flex justify-between items-center px-1 pt-1.5 pb-2.5 w-full">
            <BetButton
              className="mx-1 text-md"
              isDisabled={isCancelDisabled}
              onClick={onCancel}
            >
              <div className="i-heroicons-x-mark-solid"></div>
              <FormattedMessage id="common.cancel" />
            </BetButton>
            <BetButton
              className="mx-1 text-md"
              isDisabled={isRepeatDisabled}
              onClick={onRepeat}
            >
              <div className="i-heroicons-arrow-path-solid"></div>
              <FormattedMessage id="common.repeat" />
            </BetButton>
            <BetButton
              className="mx-1 text-md"
              isDisabled={isConfirmDisabled}
              onClick={onConfirmBet}
            >
              <div className="i-heroicons-check-solid"></div>
              <FormattedMessage id="common.confirm" />
            </BetButton>
          </div>
        </div>
      </div>

      <div className="flex relative flex-col w-full">
        <div className="flex w-full bg-gray-50">
          <div className="w-[38%]">
            {room && (
              <BeadRoad columnSize={6} roads={room.roads.bead_road.array} />
            )}
          </div>
          <div className="w-[62%]">
            {room && (
              <BigRoad columnSize={15} roads={room.roads.big_road.array} />
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
        <div className="h-[34px]">
          <AskGridMobile />
        </div>
      </div>
    </div>
  )
}

export default TableCard
