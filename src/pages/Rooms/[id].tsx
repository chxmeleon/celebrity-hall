import { FormattedMessage, useIntl } from 'react-intl'
import { clsx as cx } from 'clsx'
import { useContext, useEffect, useMemo, useState } from 'react'
import { BetButton } from '@/components/common/Button'
import { chipsImg } from '@/components/room/BetDesk/chips'
import BetDesk from '@/components/room/BetDesk'
import ChatRoom from '@/components/room/Chatroom'
import RoomStream from '@/components/room/RoomStream'
import Timer from '@/components/room/Timer'
import PokerResult from '@/components/room/PockerResult'
import {
  BeadRoad,
  BigRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad,
  AskGrid,
  AskGridMobile
} from '@/components/room/Roadmap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import GamePlayContext from '@/contexts/GamePlayContext'
import { useCurrentGameState } from '@/hooks/rooms'
import RoomNotification from '@/components/room/RoomNotification'
import WinAndLoseResult from '@/components/room/WinAndLoseResult'
import { useAuth } from '@/contexts/AuthContext'
import { Responsive, ResponsiveContext } from '@/hooks/useResponsive'
import RoomStreamMobile from '@/components/room/RoomStream/StreamMobile'
import ChatroomMobile from '@/components/room/Chatroom/ChatroomMobile'
import SinglePlayerMobile from '@/components/room/BetDesk/SinglePlayerMobile'
import RoomDataContext from '@/contexts/RoomDataContext'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Tooltip } from '@material-tailwind/react'
import QuickRoads from '@/components/room/SwitchRoom'
import { useSelectedChip } from '@/hooks/bet'

export const ChipButtonList: React.FC<{
  selectedChip: { [key: string]: string }
  onSelectedChipChanged?: (selectedChip: { [key: string]: string }) => void
  roomId: string
}> = ({ selectedChip, onSelectedChipChanged, roomId }) => {
  return (
    <>
      {chipsImg.map((item, idx) => {
        const itemName = item?.src
          ?.split('/')
          .slice(-1)[0]
          .split('.')
          .slice(0, 1)
          .toString()

        const isActive = selectedChip.chips === itemName ?? 'chips_100'
        const selected = { roomId: roomId, chips: itemName }

        return (
          <button
            key={idx}
            onClick={() => onSelectedChipChanged?.(selected)}
            className={`${
              isActive
                ? 'brightness-105 backdrop-brightness-110 shadow-md shadow-theme-300 before:absolute before:left-1 before:top-2 before:w-7 before:h-4 before:rounded-full before:bg-theme-300 before:blur-md'
                : 'shadow shadow-theme-50/80 brightness-[78%] opacity-[80%]'
            } m-auto rounded-full relative hover:cursor-pointer`}
          >
            <img src={item?.src} alt="bet image" className="w-10" />
          </button>
        )
      })}
    </>
  )
}

const Room = () => {
  const { rooms, refetch: refetchRooms } = useContext(RoomDataContext)
  const { id: roomId } = useParams<{ id: string }>()

  const room = useMemo(
    () => (roomId ? rooms.find((room) => room.id === roomId) : undefined),
    [roomId, rooms]
  )

  const { isTrial } = useAuth()
  const { onResizeWindow } = useContext(ResponsiveContext)

  useEffect(() => {
    if (room) {
      onResizeWindow?.()
    }
  }, [onResizeWindow, room])

  const streamName = room?.streamName ?? room?.streams?.[0]?.name
  const streamKey = room?.streamKey ?? room?.streams?.[0]?.key
  const secoundStreamName = room?.streams?.[1]?.name ?? room?.streams?.[0]?.name
  const secoundStreamKey = room?.streams?.[1]?.key ?? room?.streams?.[0]?.key

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const [isChangedDesk, setIsChangedDesk] = useState<boolean>(false)
  const handleSwitchDesk = () => setIsChangedDesk(!isChangedDesk)

  const [selectedChip, setSelectedChip] = useSelectedChip(room?.id ?? '')

  const {
    onConfirm,
    onRepeat,
    onCancel,
    btnState,
    dispatchBtn,
    dispatchBet,
    totalAmount,
    isNoFee,
    handleNoFeeToggle
  } = useContext(GamePlayContext)

  const { formatMessage } = useIntl()
  const { currentGameState } = useCurrentGameState(roomId ?? '')
  const { gameState, targets } = currentGameState
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('home/rooms/all')
  }

  useEffect(() => {
    if (gameState === 'START_BET' || gameState === 'UPDATE_AMOUNT') {
      dispatchBtn({ type: 'enableBet', totalAmount: totalAmount })
    } else if (gameState === 'CLOSE') {
      dispatchBet({ type: 'newRound' })
      refetchRooms?.()
    } else {
      dispatchBtn({ type: 'disableBet' })
    }
  }, [gameState, dispatchBet, totalAmount, refetchRooms, dispatchBtn])

  return (
    <>
      <Responsive.Desktop className="w-full h-full">
        {rooms.length ? (
          <section className="flex relative flex-col w-full h-full">
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
              ) : (
                <Loading />
              )}
              <div className="flex relative flex-col justify-between items-center w-full h-full z-[7]">
                <div className="flex absolute top-0 right-0 z-30 justify-between p-2 w-full">
                  <div className="pt-1">
                    <div className="px-2 pt-0.5 pb-1 text-2xl font-medium text-yellow-300 rounded-md tracking-[6px] bg-theme-50/90">
                      {room?.name}
                    </div>
                  </div>
                  <div className="flex flex-col justify-around items-end h-24">
                    <Tooltip
                      content={formatMessage({
                        id: 'components.stream.camSwitch',
                        defaultMessage: 'Switch Camera'
                      })}
                      placement="left"
                    >
                      <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                        <button
                          disabled={
                            secoundStreamKey === undefined &&
                            secoundStreamName === undefined
                          }
                          onClick={handleSwitchCam}
                          className={cx(
                            isSecondCam ? 'text-theme-300' : '',
                            secoundStreamKey === undefined &&
                              secoundStreamName === undefined
                              ? 'text-gray-500 hover:cursor-not-allowed'
                              : '',
                            'm-auto text-2xl i-heroicons-video-camera-20-solid'
                          )}
                        ></button>
                      </div>
                    </Tooltip>
                    <Tooltip
                      content={formatMessage({
                        id: 'components.stream.streamSwitch',
                        defaultMessage: 'Switch Line'
                      })}
                      placement="left"
                    >
                      <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                        <button
                          onClick={handleSwitchStream}
                          className={`${
                            isWebRTC ? 'text-theme-300' : ''
                          } m-auto text-2xl i-heroicons-wifi-20-solid`}
                        ></button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div className="relative w-full h-[63%] grid grid-cols-3">
                  <div className="flex justify-start items-end pb-2 pl-4">
                    <div className="w-[360px] h-[76%]">
                      <PokerResult roomId={room?.id ?? ''} />
                    </div>
                  </div>
                  <div className="flex relative justify-center">
                    <WinAndLoseResult gameState={gameState} />
                  </div>
                  <div className="flex flex-col h-full">
                    <div className="flex-grow pt-32">
                      <div className="m-auto h-32 aspect-square">
                        <Timer roomId={room?.id ?? ''} />
                      </div>
                    </div>
                    <div className="flex justify-center items-end pb-2 h-12">
                      <RoomNotification
                        isConfirmedSuccess={btnState.isConfirmSuccess}
                        isConfirmedFailure={btnState.isConfirmFailure}
                        isRepeatSuccess={btnState.isRepeatSuccess}
                        gameState={gameState}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-grow flex-shrink-0 w-full">
                  <BetDesk
                    selectedChip={selectedChip}
                    isDisabled={btnState.isDisable}
                    isToggle={isChangedDesk}
                    targetsData={targets}
                  />
                </div>
                <div className="flex justify-between items-center px-2 my-2 w-full h-10">
                  <div className="flex items-center w-[30%]">
                    <button
                      onClick={handleSwitchDesk}
                      className={`${
                        isChangedDesk
                          ? 'text-theme-70 bg-theme-300 '
                          : 'bg-theme-70 text-theme-300'
                      } inline-flex py-1.5 px-3 text-2xl rounded-full `}
                    >
                      <div
                        className={`${
                          isChangedDesk
                            ? 'i-heroicons-user-solid'
                            : 'i-heroicons-user-group-20-solid'
                        } text-2xl `}
                      ></div>
                    </button>
                    <button onClick={handleNoFeeToggle} className="px-1 ml-2">
                      <div
                        className={`${
                          isNoFee
                            ? 'bg-theme-300 text-theme-70'
                            : 'bg-theme-70 text-theme-300'
                        } py-1.5 px-3 font-bold rounded-full `}
                      >
                        {isNoFee ? (
                          <FormattedMessage id="common.noFee" />
                        ) : (
                          <FormattedMessage id="common.standard" />
                        )}
                      </div>
                    </button>
                    <div className="inline-flex items-center px-2">
                      <FormattedMessage id="screens.room.bet" />
                      <p className="px-2">|</p>
                      <p className="px-2">{totalAmount?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-around items-center w-1/3">
                    <ChipButtonList
                      roomId={room?.id ?? ''}
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
                  <div className="flex justify-around pl-4 w-[33%] text-theme-300">
                    <BetButton
                      isDisabled={btnState.isCancelDisabled}
                      onClick={() => onCancel(roomId ?? '')}
                    >
                      <div className="text-2xl i-heroicons-x-mark-solid"></div>
                      <FormattedMessage id="common.cancel" />
                    </BetButton>
                    <BetButton
                      isDisabled={btnState.isRepeatDisabled}
                      onClick={() => onRepeat(roomId ?? '')}
                    >
                      <div className="text-2xl i-heroicons-arrow-path-solid"></div>
                      <FormattedMessage id="common.repeat" />
                    </BetButton>
                    <BetButton
                      isDisabled={btnState.isConfirmDisabled}
                      onClick={(e) => onConfirm(e, roomId ?? '')}
                    >
                      <div className="text-2xl i-heroicons-check-solid"></div>
                      <FormattedMessage id="common.confirm" />
                    </BetButton>
                  </div>
                </div>
              </div>
            </div>

            {room && (
              <div className="flex w-full h-[20%] bg-gray-50">
                <div className="flex flex-grow justify-start">
                  <BeadRoad
                    columnSize={6}
                    className="w-[152px]"
                    roads={room.roads.bead_road.array}
                  />

                  <div className="flex-grow">
                    <div>
                      <BigRoad
                        columnSize={30}
                        roads={room.roads.big_road.array}
                      />
                    </div>
                    <div className="flex w-full">
                      <BigEyeRoad
                        className="w-1/3 h-full"
                        columnSize={16}
                        roads={room.roads.big_eye_road.graph}
                      />

                      <SmallRoad
                        className="w-1/3 h-full"
                        columnSize={16}
                        roads={room.roads.small_road.graph}
                      />

                      <CockroachRoad
                        className="w-1/3 h-full"
                        columnSize={16}
                        roads={room.roads.cockroach_road.graph}
                      />
                    </div>
                  </div>

                  <div className="h-full w-[111px]">
                    <AskGrid />
                  </div>
                </div>
                <div className="w-[13%] h-full">
                  <QuickRoads rooms={rooms} />
                </div>
                <div className="relative w-[29%] h-full">
                  <div
                    className={cx(
                      'absolute bottom-0 w-full h-full flex justify-center items-center right-0 bg-theme-50/60 z-40',
                      isTrial ? 'block' : 'hidden'
                    )}
                  >
                    <div className="w-4/5 text-xl text-center text-white">
                      <FormattedMessage
                        id="common.disabledForTrial"
                        defaultMessage="Disabled For Trial"
                      />
                    </div>
                  </div>
                  <ChatRoom />
                </div>
              </div>
            )}
          </section>
        ) : (
          <Loading />
        )}
      </Responsive.Desktop>

      <Responsive.Default className="w-full h-full bg-theme-50">
        <div className="flex flex-col w-full h-full">
          <div className="relative w-full h-0 pb-[56%]">
            <div className="absolute w-full h-full">
              <div className="grid absolute z-20 grid-cols-3 grid-rows-2 w-full h-full">
                <div className="flex pl-1">
                  <div className="flex flex-col justify-around items-end h-23">
                    <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                      {/* <button */}
                      {/*   onClick={handleBack} */}
                      {/*   className="m-auto text-xl i-heroicons-arrow-uturn-left-20-solid" */}
                      {/* ></button> */}
                      <Link
                        to="/home/rooms/all"
                        className="m-auto text-xl i-heroicons-arrow-uturn-left-20-solid"
                      ></Link>
                    </div>
                    <div className="flex w-8 h-8 rounded-md bg-theme-50/80">
                      <Tooltip
                        content={formatMessage({
                          id: 'components.stream.camSwitch',
                          defaultMessage: 'Switch Line'
                        })}
                        placement="right"
                      >
                        <button
                          disabled={
                            secoundStreamKey === undefined &&
                            secoundStreamName === undefined
                          }
                          onClick={handleSwitchCam}
                          className={cx(
                            isSecondCam ? 'text-theme-300' : '',
                            secoundStreamKey === undefined &&
                              secoundStreamName === undefined
                              ? 'text-gray-500 hover:cursor-not-allowed'
                              : '',
                            'm-auto text-2xl i-heroicons-video-camera-20-solid'
                          )}
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
                  <Timer roomId={room?.id ?? ''} />
                </div>
                <div></div>
                <div className="flex col-span-2 justify-end pb-1 w-full h-full">
                  <div className="flex flex-col justify-end w-2/3">
                    <RoomNotification
                      isConfirmedSuccess={btnState.isConfirmSuccess}
                      isConfirmedFailure={btnState.isConfirmFailure}
                      isRepeatSuccess={btnState.isRepeatSuccess}
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
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>

          <div className="relative w-full h-6">
            <div className="flex absolute top-1.5 z-30 justify-center w-full pointer-events-none">
              <WinAndLoseResult gameState={gameState} />
            </div>
            <div className="flex justify-between items-center py-1 px-2 w-full h-full text-xs">
              <div className="inline-flex pl-2.5">
                <span>
                  <FormattedMessage id="screens.room.bet" />
                </span>
                <span className="px-2">|</span>
                <span>{totalAmount?.toLocaleString()}</span>
              </div>
              <button onClick={handleNoFeeToggle} className="px-1 ml-2">
                <div
                  className={`${
                    isNoFee
                      ? 'bg-theme-300 text-theme-70'
                      : 'bg-theme-70 text-theme-300'
                  } py-[1px] px-1.5 font-bold rounded-full `}
                >
                  {isNoFee ? (
                    <FormattedMessage id="common.noFee" />
                  ) : (
                    <FormattedMessage id="common.standard" />
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="flex relative flex-col w-full">
            <div className="absolute z-30 w-full h-full pointer-events-none min-h-[298px]">
              <div className="py-1 px-2 w-full h-full">
                <PokerResult roomId={room?.id ?? ''} />
              </div>
            </div>
            <div>
              <SinglePlayerMobile
                selectedChip={selectedChip}
                isDisabled={btnState.isDisable}
              />
            </div>
            <div className="flex flex-col w-full h-2/5">
              <div className="flex justify-around py-3 px-2 w-full">
                <ChipButtonList
                  roomId={room?.id ?? ''}
                  selectedChip={selectedChip}
                  onSelectedChipChanged={setSelectedChip}
                />
              </div>
              <div className="flex flex-grow justify-between items-center px-1 w-full">
                <BetButton
                  className="mx-1 text-md"
                  isDisabled={btnState.isCancelDisabled}
                  onClick={() => onCancel(roomId ?? '')}
                >
                  <div className="i-heroicons-x-mark-solid"></div>
                  <FormattedMessage id="common.cancel" />
                </BetButton>
                <BetButton
                  className="mx-1 text-md"
                  isDisabled={btnState.isRepeatDisabled}
                  onClick={() => onRepeat(roomId ?? '')}
                >
                  <div className="i-heroicons-arrow-path-solid"></div>
                  <FormattedMessage id="common.repeat" />
                </BetButton>
                <BetButton
                  className="mx-1 text-md"
                  isDisabled={btnState.isConfirmDisabled}
                  onClick={(e) => onConfirm(e, roomId ?? '')}
                >
                  <div className="i-heroicons-check-solid"></div>
                  <FormattedMessage id="common.confirm" />
                </BetButton>
              </div>
            </div>
          </div>

          <div className="flex relative flex-col pt-2 w-full">
            <div
              className={cx(
                'absolute bottom-0 w-full h-11 flex justify-center items-center right-0 bg-theme-50/60 z-50',
                isTrial ? 'block' : 'hidden'
              )}
            >
              <div className="text-xl text-white">
                <FormattedMessage
                  id="common.disabledForTrial"
                  defaultMessage="Disabled For Trial"
                />
              </div>
            </div>
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
            <div className="h-7">
              <AskGridMobile roomId={roomId ?? ''} />
            </div>
            <div className="h-11"></div>
          </div>
        </div>
      </Responsive.Default>
    </>
  )
}

export default Room
