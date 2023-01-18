import { FormattedMessage } from 'react-intl'
import { CREATE_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { useContext, useEffect, useState } from 'react'
import { BetButton } from '@/components/common/Button'
import { chipsImg } from '@/components/room/BetDesk/chips'
import { useSetup } from '@/contexts/SetupContext'
import BetDesk from '@/components/room/BetDesk'
import ChatRoom from '@/components/room/Chatroom'
import RoomStream from '@/components/room/RoomStream'
import Timer from '@/components/room/Timer'
import PockerResult from '@/components/room/PockerResult'
import {
  BeadPlate,
  BigRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad,
  AskGrid
} from '@/components/room/Roadmap'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ROOM_STREAM } from '@/gql/stream'
import GamePlayContext from '@/contexts/GamePlayContext'
import { useCurrentGameState } from '@/hooks/rooms'
import { useActionCable } from '@/contexts/ActionCableContext'
import { BetInitialValueProp, betInitialValue } from '@/hooks/bet'
import RoomNotification from '@/components/room/RoomNotification'
import WinAndLoseResult from '@/components/room/WinAndLoseResult'

const Room = () => {
  const roomId = useParams()
  const { data } = useQuery(GET_ROOM_STREAM, {
    variables: { baccaratRoomId: Number(roomId?.id) }
  })

  const streamName = data?.baccaratRoom?.streamName
  const streamKey = data?.baccaratRoom?.streamKey
  const secoundStreamName = data?.baccaratRoom?.streams[0].name
  const secoundStreamKey = data?.baccaratRoom?.streams[0].key

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const [isChangedDesk, setIsChangedDesk] = useState<boolean>(false)
  const handleSwitchDesk = () => setIsChangedDesk(!isChangedDesk)

  const { isRegular, handleRegularToggle } = useSetup()
  const {
    selectedChip,
    setSelectedChip,
    betState,
    dispatchBet,
    wallet,
    notice
  } = useContext(GamePlayContext)

  const { currentGameState } = useCurrentGameState(roomId.id)
  const { gameState } = currentGameState
  const [isDisable, setIsDisable] = useState(true)
  const { deviceInfo } = useSetup()

  const [createBaccaratBet] = useMutation<
    types.CREATE_BACCARAT_BET,
    types.CREATE_BACCARAT_BETVariables
  >(CREATE_BACCARAT_BET)

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
      const result = await createBaccaratBet({
        variables: {
          input: {
            baccaratRoomId: roomId.id ?? '',
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
      setIsCancelSuccess(result.errors?.length === 0)
    }
    setIsConfirmDisabled(false)
    setIsCancelDisabled(true)
  }

  const [isConfirmSuccess, setIsConfirmSuccess] = useState(false)
  const onConfirmBet = async (e: React.MouseEvent) => {
    if (totalAmount >= 1000 && totalAmount <= wallet?.balance) {
      try {
        const result = await createBaccaratBet({
          variables: {
            input: {
              baccaratRoomId: roomId.id ?? '',
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
        setIsConfirmSuccess(
          result?.data?.createBaccaratBet?.errors?.length === 0
        )
        setIsConfirmDisabled(true)
        setPreBetState(betState)
      } catch (err) {
        console.log(err)
      }
      setTimeout(() => {
        setIsConfirmSuccess(false)
      }, 3500)
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
            baccaratRoomId: roomId.id ?? '',
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
      setIsRepeatSuccess(result?.data?.createBaccaratBet?.errors?.length === 0)
      setIsCancelDisabled(false)
      setIsRepeatDisabled(true)
      setIsConfirmDisabled(true)
    } catch (err) {
      console.log(err)
    }
    setTimeout(() => {
      setIsRepeatSuccess(false)
    }, 3500)
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
    } else {
      setIsDisable(true)
      setIsConfirmDisabled(true)
      setIsRepeatDisabled(true)
      setIsCancelDisabled(true)
    }
  }, [gameState, dispatchBet, totalAmount])

  const chipsButton = chipsImg.map((item, idx) => {
    const itemName = item?.src
      ?.split('/')
      .slice(-1)[0]
      .split('.')
      .slice(0, 1)
      .toString()

    const isActive = selectedChip === itemName ?? 'chips_100'

    return (
      <button
        key={idx}
        onClick={() => setSelectedChip(itemName)}
        className={`${
          isActive
            ? 'brightness-105 backdrop-brightness-110 shadow-md shadow-theme-300 before:absolute before:left-1 before:top-2 before:w-7 before:h-4 before:rounded-full before:bg-theme-300 before:blur-md'
            : 'shadow shadow-theme-50/80 brightness-75'
        } rounded-full relative hover:cursor-pointer`}
      >
        <img src={item?.src} alt="bet image" className="w-10" />
      </button>
    )
  })

  return (
    <div className="flex relative flex-col w-full h-full">
      <div className="relative w-full h-4/5">
        {isSecondCam ? (
          <RoomStream
            streamName={secoundStreamName}
            streamKey={secoundStreamKey}
            videoOn={true}
            isWebRTC={isWebRTC}
          />
        ) : (
          <RoomStream
            streamName={streamName}
            streamKey={streamKey}
            videoOn={true}
            isWebRTC={isWebRTC}
          />
        )}

        <div className="flex relative flex-col justify-between items-center w-full h-full z-[7]">
          <div className="flex absolute top-0 right-0 z-30 justify-end p-2 w-full">
            <div className="flex flex-col justify-around items-end h-24 w-[5.5rem]">
              <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                <button
                  onClick={handleSwitchCam}
                  className={`${
                    isSecondCam ? 'text-theme-300' : ''
                  } m-auto text-2xl i-heroicons-video-camera-20-solid`}
                ></button>
              </div>
              <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                <button
                  onClick={handleSwitchStream}
                  className={`${
                    isWebRTC ? 'text-theme-300' : ''
                  } m-auto text-2xl i-heroicons-wifi-20-solid`}
                ></button>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[63%] grid grid-cols-3">
            <div className="flex justify-start items-end pb-2 pl-4">
              <div className="w-[340px] h-[68%]">
                <PockerResult />
              </div>
            </div>
            <div className="flex relative justify-center">
              <WinAndLoseResult
                isRepeatSuccess={isRepeatSuccess}
                isConfirmedSuccess={isConfirmSuccess}
                gameState={gameState}
              />
            </div>
            <div className="flex flex-col h-full">
              <div className="flex-grow pt-32">
                <div className="m-auto h-32 aspect-square">
                  <Timer />
                </div>
              </div>
              <div className="flex justify-center items-end h-12">
                <RoomNotification
                  isConfirmedSuccess={isConfirmSuccess}
                  isRepeatSuccess={isRepeatSuccess}
                  gameState={gameState}
                />
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 w-full">
            <BetDesk isDisabled={isDisable} isToggle={isChangedDesk} />
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-full h-10">
            <div className="flex items-center w-[30%]">
              {/* gameplay's switch */}
              {/* <button
                onClick={handleSwitchDesk}
                className={`${
                  isChangedDesk
                    ? 'text-theme-70 bg-theme-300 '
                    : 'bg-theme-70 text-theme-300'
                } inline-flex p-2 text-2xl rounded-full `}
              >
                <div
                  className={`${
                    isChangedDesk
                      ? 'i-heroicons-user-solid'
                      : 'i-heroicons-user-group-20-solid'
                  } text-2xl `}
                ></div>
              </button> */}
              {/* <button onClick={handleRegularToggle} className="px-1 ml-2">
                <div
                  className={`${
                    isRegular
                      ? 'bg-theme-300 text-theme-70'
                      : 'bg-theme-70 text-theme-300'
                  } py-1.5 px-3 font-bold rounded-full `}
                >
                  {isRegular ? (
                    <FormattedMessage id="common.noFee" />
                  ) : (
                    <FormattedMessage id="common.standard" />
                  )}
                </div>
              </button> */}
              <div className="inline-flex px-2">
                <FormattedMessage id="screens.room.bet" />
                <p className="px-2">|</p>
                <p className="px-2">{totalAmount}</p>
              </div>
            </div>
            <div className="flex justify-around items-center w-1/3">
              {chipsButton}
              {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
              {/*   <button className="text-xl i-heroicons-play-pause-solid" /> */}
              {/* </div> */}
              {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
              {/*   <button className="text-xl i-heroicons-pencil-square-20-solid" /> */}
              {/* </div> */}
            </div>
            <div className="flex pl-24 w-[36%] text-theme-300">
              <BetButton isDisabled={isCancelDisabled} onClick={onCancel}>
                <div className="text-2xl i-heroicons-x-mark-solid"></div>
                <FormattedMessage id="common.cancel" />
              </BetButton>
              <BetButton isDisabled={isRepeatDisabled} onClick={onRepeat}>
                <div className="text-2xl i-heroicons-arrow-path-solid"></div>
                <FormattedMessage id="common.repeat" />
              </BetButton>
              <BetButton isDisabled={isConfirmDisabled} onClick={onConfirmBet}>
                <div className="text-2xl i-heroicons-check-solid"></div>
                <FormattedMessage id="common.confirm" />
              </BetButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-1/5 bg-gray-50">
        <div className="flex flex-grow justify-start">
          <div className="flex-grow-0 flex-shrink-0 w-1/3">
            <BeadPlate />
          </div>
          <div className="flex w-2/3">
            <div className="block flex-grow w-full">
              <div className="h-2/3">
                <BigRoad />
              </div>
              <div className="flex w-full h-1/3">
                <div className="w-1/3">
                  <BigEyeRoad />
                </div>
                <div className="w-1/3">
                  <SmallRoad />
                </div>
                <div className="w-1/3">
                  <CockroachRoad />
                </div>
              </div>
            </div>
            <div className="w-1/4 h-full">
              <AskGrid />
            </div>
          </div>
        </div>
        {/* <div className="w-[11%] h-full flex-shrink-0"></div> */}
        <div className="w-2/6 h-full">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}

export default Room
