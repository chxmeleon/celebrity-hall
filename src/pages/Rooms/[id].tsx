import { FormattedMessage } from 'react-intl'
import { clsx as cx } from 'clsx'
import { CREATE_BACCARAT_BET, CANCEL_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { useContext, useEffect, useMemo, useState } from 'react'
import { BetButton } from '@/components/common/Button'
import { chipsImg } from '@/components/room/BetDesk/chips'
import { useSetup } from '@/contexts/SetupContext'
import BetDesk from '@/components/room/BetDesk'
import ChatRoom from '@/components/room/Chatroom'
import RoomStream from '@/components/room/RoomStream'
import Timer from '@/components/room/Timer'
import PockerResult from '@/components/room/PockerResult'
import {
  BeadRoad,
  BigRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad,
  AskGrid,
  AskGridMobile
} from '@/components/room/Roadmap'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ROOM_STREAM } from '@/gql/stream'
import GamePlayContext from '@/contexts/GamePlayContext'
import { useCurrentGameState } from '@/hooks/rooms'
import { useActionCable } from '@/contexts/ActionCableContext'
import { BetInitialValueProp, betInitialValue } from '@/hooks/bet'
import RoomNotification from '@/components/room/RoomNotification'
import WinAndLoseResult from '@/components/room/WinAndLoseResult'
import StreamMobile from '@/components/room/RoomStream/StreamMobile'
import {
  NodePlayerStream,
  NodePlayerStreamMobile
} from '@/components/room/RoomStream/streamPlayer'
import { Responsive } from '@/hooks/useResponsive'
import RoomStreamMobile from '@/components/room/RoomStream/StreamMobile'
import ChatroomMobile from '@/components/room/Chatroom/ChatroomMobile'
import SinglePlayerMobile from '@/components/room/BetDesk/SinglePlayerMobile'
import RoomDataContext from '@/contexts/RoomDataContext'

const ChipButtonList: React.FC<{
  selectedChip: string
  onSelectedChipChanged?: (selectedChip: string) => void
}> = ({ selectedChip, onSelectedChipChanged }) => {
  return (
    <>
      {chipsImg.map((item, idx) => {
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
            onClick={() => onSelectedChipChanged?.(itemName)}
            className={`${
              isActive
                ? 'brightness-105 backdrop-brightness-110 shadow-md shadow-theme-300 before:absolute before:left-1 before:top-2 before:w-7 before:h-4 before:rounded-full before:bg-theme-300 before:blur-md'
                : 'shadow shadow-theme-50/80 brightness-[78%] opacity-[80%]'
            } rounded-full relative hover:cursor-pointer`}
          >
            <img src={item?.src} alt="bet image" className="w-10" />
          </button>
        )
      })}
    </>
  )
}

const Room = () => {
  const { rooms } = useContext(RoomDataContext)
  const { id: roomId } = useParams<{ id: string }>()
  const room = useMemo(
    () => (roomId ? rooms.find((room) => room.id === roomId) : undefined),
    [roomId, rooms]
  )

  const streamName = room?.streamName
  const streamKey = room?.streamKey
  const secoundStreamName = room?.streams?.[0].name
  const secoundStreamKey = room?.streams?.[0].key

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const [isChangedDesk, setIsChangedDesk] = useState<boolean>(false)
  const handleSwitchDesk = () => setIsChangedDesk(!isChangedDesk)

  const { isRegular, handleRegularToggle } = useSetup()
  const { selectedChip, setSelectedChip, betState, dispatchBet, wallet } =
    useContext(GamePlayContext)

  const { currentGameState } = useCurrentGameState(roomId ?? '')
  const { gameState } = currentGameState
  const [isDisable, setIsDisable] = useState(true)
  const { deviceInfo } = useSetup()

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
            baccaratRoomId: roomId ?? ''
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
              baccaratRoomId: roomId ?? '',
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
            baccaratRoomId: roomId ?? '',
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
    } else {
      setIsDisable(true)
      setIsConfirmDisabled(true)
      setIsRepeatDisabled(true)
      setIsCancelDisabled(true)
    }
  }, [gameState, dispatchBet, totalAmount])

  return (
    <>
      <Responsive.Desktop>
        <section className="flex relative flex-col w-full h-[93.6vh]">
          <div className="relative w-full h-4/5">
            {isSecondCam && secoundStreamName && secoundStreamKey ? (
              <RoomStream
                streamName={secoundStreamName}
                streamKey={secoundStreamKey}
                videoOn={true}
                isWebRTC={isWebRTC}
              />
            ) : streamName && streamKey ? (
              <RoomStream
                streamName={streamName}
                streamKey={streamKey}
                videoOn={true}
                isWebRTC={isWebRTC}
              />
            ) : null}
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
                  <div className="w-[340px] md:h-[71%] xl:h-[82%]">
                    <PockerResult />
                  </div>
                </div>
                <div className="flex relative justify-center">
                  <WinAndLoseResult gameState={gameState} />
                </div>
                <div className="flex flex-col h-full">
                  <div className="flex-grow pt-32">
                    <div className="m-auto h-32 aspect-square">
                      <Timer />
                    </div>
                  </div>
                  <div className="flex justify-center items-end pb-2 h-12">
                    <RoomNotification
                      isConfirmedSuccess={isConfirmSuccess}
                      isConfirmedFailure={isConfirmFailure}
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
                  <div className="inline-flex items-center px-2">
                    <FormattedMessage id="screens.room.bet" />
                    <p className="px-2">|</p>
                    <p className="px-2">{totalAmount}</p>
                  </div>
                </div>
                <div className="flex justify-around items-center w-1/3">
                  <ChipButtonList
                    selectedChip={selectedChip}
                    onSelectedChipChanged={setSelectedChip}
                  />
                  {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
                  {/*   <button className="text-xl i-heroicons-play-pause-solid" /> */}
                  {/* </div> */}
                  {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
                  {/*   <button className="text-xl i-heroicons-pencil-square-20-solid" /> */}
                  {/* </div> */}
                </div>
                <div className="flex pl-6 w-[36%] text-theme-300">
                  <BetButton isDisabled={isCancelDisabled} onClick={onCancel}>
                    <div className="text-2xl i-heroicons-x-mark-solid"></div>
                    <FormattedMessage id="common.cancel" />
                  </BetButton>
                  <BetButton isDisabled={isRepeatDisabled} onClick={onRepeat}>
                    <div className="text-2xl i-heroicons-arrow-path-solid"></div>
                    <FormattedMessage id="common.repeat" />
                  </BetButton>
                  <BetButton
                    isDisabled={isConfirmDisabled}
                    onClick={onConfirmBet}
                  >
                    <div className="text-2xl i-heroicons-check-solid"></div>
                    <FormattedMessage id="common.confirm" />
                  </BetButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-[20%] bg-gray-50">
            <div className="flex flex-grow justify-start">
              {room && (
                <BeadRoad
                  className="w-[242px]"
                  roads={room.roads.bead_road.array}
                />
              )}

              <div className="w-[436px]">
                <div>
                  {room && (
                    <BigRoad
                      columnSize={27}
                      roads={room.roads.big_road.array}
                    />
                  )}
                </div>

                <div className="flex w-full">
                  {room && (
                    <BigEyeRoad
                      className="w-1/3"
                      columnSize={18}
                      roads={room.roads.big_eye_road.graph}
                    />
                  )}

                  {room && (
                    <SmallRoad
                      className="w-1/3"
                      columnSize={18}
                      roads={room.roads.small_road.graph}
                    />
                  )}

                  {room && (
                    <CockroachRoad
                      className="w-1/3"
                      columnSize={18}
                      roads={room.roads.cockroach_road.graph}
                    />
                  )}
                </div>
              </div>

              <div className="w-[128px] h-full">
                <AskGrid />
              </div>
            </div>
            {/* <div className="w-[11%] h-full flex-shrink-0"></div> */}

            <div className="w-[30%] h-full">
              <ChatRoom />
            </div>
          </div>
        </section>
      </Responsive.Desktop>

      <Responsive.Default>
        <section className="flex flex-col w-full bg-theme-50 375:h-[93vh] 390:h-[94vh] 414:h-[94.3vh]">
          <div className="relative flex-grow flex-shrink-0 w-full h-auto aspect-video">
            <div className="grid absolute z-20 grid-cols-3 grid-rows-2 w-full h-full">
              <div className="flex pl-1">
                <div className="flex flex-col justify-around items-end h-23">
                  <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                    <Link
                      to="/home/rooms"
                      className="m-auto text-xl i-heroicons-arrow-uturn-left-20-solid"
                    ></Link>
                  </div>

                  <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                    <button
                      onClick={handleSwitchCam}
                      className={`${
                        isSecondCam ? 'text-theme-300' : ''
                      } m-auto text-xl i-heroicons-video-camera-20-solid`}
                    ></button>
                  </div>
                  <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                    <button
                      onClick={handleSwitchStream}
                      className={`${
                        isWebRTC ? 'text-theme-300' : ''
                      } m-auto text-xl i-heroicons-wifi-20-solid`}
                    ></button>
                  </div>
                </div>
              </div>
              <div></div>
              <div className="flex m-auto w-14 aspect-square">
                <Timer />
              </div>
              <div></div>
              <div className="col-span-2 flex  justify-end pb-1 w-full h-full">
                <div className="w-2/3 flex flex-col justify-end">
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
                <RoomStream
                  streamName={secoundStreamName}
                  streamKey={secoundStreamKey}
                  videoOn={true}
                  isWebRTC={isWebRTC}
                />
              ) : streamName && streamKey ? (
                <RoomStream
                  streamName={streamName}
                  streamKey={streamKey}
                  videoOn={true}
                  isWebRTC={isWebRTC}
                />
              ) : null}
            </div>
          </div>

          <div className="relative w-full h-10">
            <div className="flex absolute justify-center w-full z-30 top-1.5 pointer-events-none">
              <WinAndLoseResult gameState={gameState} />
            </div>
            <div className="inline-flex items-center pb-2 px-2 h-full text-sm">
              <FormattedMessage id="screens.room.bet" />
              <p className="px-2">|</p>
              <p className="px-2 pt-0.5">{totalAmount}</p>
            </div>
          </div>

          <div className="flex relative flex-col flex-grow w-full">
            <div className="absolute z-30 w-full h-full pointer-events-none">
              <div className="py-1 px-2 w-full h-full">
                <PockerResult />
              </div>
            </div>
            <SinglePlayerMobile isDisabled={isDisable} />
            <div className="flex flex-col w-full h-2/5">
              <div className="flex justify-around py-3 px-2 w-full">
                <ChipButtonList
                  selectedChip={selectedChip}
                  onSelectedChipChanged={setSelectedChip}
                />
              </div>
              <div className="flex flex-grow justify-between items-center px-2 w-full bg-black/75">
                <BetButton isDisabled={isCancelDisabled} onClick={onCancel}>
                  <div className="text-2xl i-heroicons-x-mark-solid"></div>
                  <FormattedMessage id="common.cancel" />
                </BetButton>
                <BetButton isDisabled={isRepeatDisabled} onClick={onRepeat}>
                  <div className="text-2xl i-heroicons-arrow-path-solid"></div>
                  <FormattedMessage id="common.repeat" />
                </BetButton>
                <BetButton
                  isDisabled={isConfirmDisabled}
                  onClick={onConfirmBet}
                >
                  <div className="text-2xl i-heroicons-check-solid"></div>
                  <FormattedMessage id="common.confirm" />
                </BetButton>
              </div>
            </div>
          </div>
          <div className="flex relative flex-col pt-2 w-full">
            <div className="absolute bottom-0 z-30 w-full h-full">
              <ChatroomMobile />
            </div>

            <div className="flex w-full bg-gray-50">
              <div className="w-[37.5%]">
                {room && (
                  <BeadRoad columnSize={6} roads={room.roads.bead_road.array} />
                )}
              </div>

              <div className="w-[62.5%]">
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
            <div className="h-12 ">
              <AskGridMobile />
            </div>
            <div className="h-11"></div>
          </div>
        </section>
      </Responsive.Default>
    </>
  )
}

export default Room
