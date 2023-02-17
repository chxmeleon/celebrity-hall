import { RoomProps } from '@/types/room'
import { FormattedMessage, useIntl } from 'react-intl'
import { clsx as cx } from 'clsx'
import Timer from '@/components/room/Timer'
import PokerResult from '@/components/room/PockerResult'
import { AskGridMobile, BigRoad } from '@/components/room/Roadmap'
import { useCurrentGameState } from '@/hooks/rooms'
import RoomStreamMobile from '@/components/room/RoomStream/StreamMobile'
import {
  BetArea,
  betAreaMapper
} from '@/components/room/BetDesk/SinglePlayerMobile'
import Loading from '@/components/room/RoomStream/StreamLoading'
import { Tooltip } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import RoomDataContext from '@/contexts/RoomDataContext'
import GamePlayContext from '@/contexts/GamePlayContext'
import { chipsData } from '../BetDesk/chips'
import { ChipButtonList } from '@/pages/Rooms/[id]'
import { BetButton } from '@/components/common/Button'
import RoomNotification from '../RoomNotification'
import { useSelectedChip } from '@/hooks/bet'

type RoomDataProps = {
  room: RoomProps
  isActived?: boolean
}

const TableCardMobile: React.FC<RoomDataProps> = ({ room, isActived }) => {
  const { refetch: refetchRooms, isTablesPath } = useContext(RoomDataContext)
  const href = `/home/room/${room.id}`
  const streamName = room?.streamName ?? room?.streams?.[0]?.name
  const streamKey = room?.streamKey ?? room?.streams?.[0]?.key
  const secoundStreamName = room?.streams?.[1]?.name ?? room?.streams?.[0]?.name
  const secoundStreamKey = room?.streams?.[1]?.key ?? room?.streams?.[0]?.key

  const [isSecondCam, setIsSecondCam] = useState(false)
  const handleSwitchCam = () => setIsSecondCam(!isSecondCam)

  const [isWebRTC, setIsWebRTC] = useState(false)
  const handleSwitchStream = () => setIsWebRTC(!isWebRTC)

  const [selectedChip, setSelectedChip] = useSelectedChip(room?.id ?? '')

  const {
    isNoFee,
    handleNoFeeToggle,
    betState,
    onConfirm,
    onCancel,
    btnState,
    dispatchBtn,
    dispatchBet,
    totalAmount
  } = useContext(GamePlayContext)

  const { formatMessage } = useIntl()

  const { currentGameState } = useCurrentGameState(room.id)
  const { gameState } = currentGameState

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDisabledCamBtn, setIsDisabledCamBtn] = useState<boolean>(false)
  const onToggleStream = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  useEffect(() => {
    if (!isActived) {
      setIsOpen(false)
    }
  }, [isActived])

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

  const betTarget = [
    ['playerDragon', 'tie', 'dealerDragon'],
    ['player', 'dealer']
  ]

  const btnStyle = cx(
    'w-full h-full rounded-md bg-theme-75 relative [&_.ratio]:text-gray-300 [&_.ratio]:text-xs',
    btnState.isDisable ? 'brightness-50' : ''
  )

  return (
    <div className="relative mb-4 w-full h-full rounded-md p-[1.6px] bg-link-button-54">
      <div
        className={cx(
          btnState.isDisable ? '' : 'pointer-events-none',
          'p-1 absolute bottom-0 left-0 z-40 flex justify-center items-center w-full ',
          isOpen ? 'h-1/2' : 'h-full'
        )}
      >
        <PokerResult roomId={room?.id} isTablesPath={true} />
      </div>
      <div className="pb-1.5 rounded-md bg-theme-50">
        <div className="flex justify-between items-center p-3 w-full h-11 text-sm">
          <div className="inline-flex items-center">
            <div className="pr-2 font-bold text-gray-50">{room.name}</div>
            <div className="w-10 aspect-square">
              <Timer roomId={room.id} />
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onToggleStream}
              disabled={!isActived}
              className={cx(
                isOpen ? 'i-heroicons-camera-20-solid' : 'i-heroicons-camera',
                'text-xl mr-3'
              )}
            ></button>
            <button onClick={handleNoFeeToggle} className="px-1 mr-2">
              <div
                className={`${
                  isNoFee
                    ? 'bg-theme-300 text-theme-70'
                    : 'bg-theme-70 text-theme-300'
                } py-[1px] px-1.5  rounded-full  text-sm`}
              >
                {isNoFee ? (
                  <FormattedMessage id="common.noFee" defaultMessage="No Fee" />
                ) : (
                  <FormattedMessage id="common.standard" defaultMessage="Standard" />
                )}
              </div>
            </button>

            <Link to={href} key={href} className="w-14 text-center">
              <div className="flex px-3 rounded-full border border-theme-300 text-theme-300">
                <FormattedMessage
                  id="screens.baccaratRooms.enterRoom"
                  defaultMessage="Enter"
                />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={cx(
            isOpen ? 'h-[320px]' : 'h-0',
            'relative w-full duration-150 ease-in '
          )}
        >
          <div
            className={cx(
              isOpen ? '' : 'hidden',
              'relative bg-black w-full h-full'
            )}
          >
            <div className="flex absolute z-30 flex-col justify-around pl-1 h-20">
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
                    disabled={
                      secoundStreamKey === undefined &&
                      secoundStreamName === undefined
                    }
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
            {isOpen ? (
              isSecondCam && secoundStreamName && secoundStreamKey ? (
                <RoomStreamMobile
                  streamName={secoundStreamName}
                  streamKey={secoundStreamKey}
                  videoOn={true}
                  isWebRTC={isWebRTC}
                  isTablesPath={isTablesPath}
                  isActived={isActived}
                />
              ) : streamName && streamKey ? (
                <RoomStreamMobile
                  streamName={streamName}
                  streamKey={streamKey}
                  videoOn={true}
                  isWebRTC={isWebRTC}
                  isTablesPath={isTablesPath}
                  isActived={isActived}
                />
              ) : (
                <Loading size="small" />
              )
            ) : null}
          </div>
        </div>
        <div className="flex py-2 w-full h-[123px]">
          <div className="relative w-1/2 bg-gray-50">
            <div className="flex absolute inset-0 z-10 justify-center items-end w-full h-full">
              <RoomNotification
                isConfirmedSuccess={btnState?.isConfirmSuccess}
                isConfirmedFailure={btnState?.isConfirmFailure}
                isRepeatSuccess={btnState?.isRepeatSuccess}
                isTablesPath={isTablesPath}
                gameState={gameState}
              />
            </div>
            {room && (
              <BigRoad columnSize={10} roads={room.roads.big_road.array} />
            )}
          </div>
          <div className="grid grid-rows-2 gap-1 w-1/2">
            <div className="grid grid-cols-3 gap-1">
              {betTarget[0].map((item, idx) => (
                <button
                  key={item}
                  disabled={btnState.isDisable}
                  onClick={() =>
                    dispatchBet({
                      type: 'addChips',
                      target: item,
                      amount: chipsData?.[selectedChip.chips]?.value
                    })
                  }
                  className={btnStyle}
                >
                  <BetArea target={betState[item]} />
                  <div className={cx(betAreaMapper[item].textStyle)}>
                    {idx > 4 ? (
                      <div className="text-xl font-bold">
                        <FormattedMessage id={betAreaMapper[item].id} />
                      </div>
                    ) : (
                      <div className={cx('font-bold text-[13px]')}>
                        <FormattedMessage id={betAreaMapper[item].id} />
                      </div>
                    )}
                    <p className="ratio">{betAreaMapper[item].text}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {betTarget[1].map((item, idx) => (
                <button
                  key={item}
                  disabled={btnState.isDisable}
                  onClick={() =>
                    dispatchBet({
                      type: 'addChips',
                      target: item,
                      amount: chipsData?.[selectedChip.chips]?.value
                    })
                  }
                  className={btnStyle}
                >
                  <BetArea target={betState[item]} />
                  <div className={cx(betAreaMapper[item].textStyle)}>
                    <div className="text-xl font-bold">
                      <FormattedMessage id={betAreaMapper[item].id} />
                    </div>
                    {isNoFee && idx === 1 ? (
                      <p className="ratio">1:1</p>
                    ) : (
                      <p className="ratio">{betAreaMapper[item].text}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-2">
          <AskGridMobile size="small" roomId={room?.id} noAsk={true} />
        </div>
        <div className="flex py-2 px-1 w-full">
          <div className="overflow-x-scroll w-1/2">
            <div className="flex gap-1 w-[300px]">
              <ChipButtonList
                roomId={room?.id}
                selectedChip={selectedChip}
                onSelectedChipChanged={setSelectedChip}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-1/2">
            <BetButton
              className="mx-1 text-[9px]"
              isDisabled={btnState.isCancelDisabled}
              onClick={() => onCancel(room.id)}
            >
              <div className="i-heroicons-x-mark-solid"></div>
              <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
            </BetButton>
            <BetButton
              className="mx-1 text-[9px]"
              isDisabled={btnState.isConfirmDisabled}
              onClick={(e) => onConfirm(e, room?.id)}
            >
              <div className="i-heroicons-check-solid"></div>
              <FormattedMessage id="common.confirm" defaultMessage="Confirm" />
            </BetButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableCardMobile
