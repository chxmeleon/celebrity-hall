import { FormattedMessage } from 'react-intl'
import { clsx as cx } from 'clsx'
import { useState } from 'react'
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
import { GET_CURRENT_BACCARAT_ROOM } from '@/gql/baccaratrooms'

const Room = () => {
  const roomId = useParams()
  const { data } = useQuery(GET_ROOM_STREAM, {
    variables: { baccaratRoomId: Number(roomId?.id) }
  })

  const { data: currentGame } = useQuery(GET_CURRENT_BACCARAT_ROOM, {
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
  const [betPrice, setBetPrice] = useState('chips_10')
  const { isRegular, handleRegularToggle } = useSetup()

  const handleSwitchDesk = () => setIsChangedDesk(!isChangedDesk)

  const handleSelectBetPrice = (e: React.MouseEvent) => {
    const chipImgSrc = (e.target as HTMLImageElement).src
      ?.split('/')
      .slice(-1)[0]
      .split('.')
      .slice(0, 1)
      .toString()
    setBetPrice(chipImgSrc)
  }

  const chipsButton = chipsImg.map((item, idx) => {
    const isActive =
      betPrice ===
      item?.split('/').slice(-1)[0].split('.').slice(0, 1).toString()

    return (
      <button
        key={idx}
        onClick={handleSelectBetPrice}
        className={`${isActive
            ? 'shadow-md shadow-theme-300 before:absolute before:left-1 before:top-2 before:w-7 before:h-4 before:rounded-full before:bg-theme-300 before:blur-md'
            : 'shadow shadow-theme-50/80'
          } rounded-full relative hover:cursor-pointer`}
      >
        <img src={item} alt="bet image" className="w-9" />
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
            <div className="flex flex-col justify-around h-24 items-end w-[5.5rem]">
              <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                <button
                  onClick={handleSwitchCam}
                  className={`${isSecondCam ? 'text-theme-300' : ''
                    } m-auto text-2xl i-heroicons-video-camera-20-solid`}
                ></button>
              </div>
              <div className="flex w-10 h-10 rounded-md bg-theme-50/80">
                <button
                  onClick={handleSwitchStream}
                  className={`${isWebRTC ? 'text-theme-300' : ''
                    } m-auto text-2xl i-heroicons-wifi-20-solid`}
                ></button>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[63%] grid grid-cols-3">
            <div className="flex justify-start items-end pb-2 pl-4">
              <div className="w-[326px] h-[57%]">
                <PockerResult />
              </div>
            </div>
            <div className="flex"></div>
            <div className="flex">
              <div className="m-auto h-32 aspect-square">
                <Timer />
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 w-full">
            <BetDesk isToggle={isChangedDesk} />
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
              <button onClick={handleRegularToggle} className="px-1 ml-2">
                <div
                  className={`${isRegular
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
              </button>
              <div className="inline-flex px-2">
                <FormattedMessage id="screens.room.bet" />
                <p className="px-2">|</p>
                <p className="px-2">0</p>
              </div>
            </div>
            <div className="flex flex-grow justify-around items-center">
              {chipsButton}
              {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
              {/*   <button className="text-xl i-heroicons-play-pause-solid" /> */}
              {/* </div> */}
              {/* <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/90 text-theme-300"> */}
              {/*   <button className="text-xl i-heroicons-pencil-square-20-solid" /> */}
              {/* </div> */}
            </div>
            <div className="flex pl-5 w-[36%] text-theme-300">
              <BetButton onClick={() => null}>
                <div className="text-2xl i-heroicons-x-mark-solid"></div>
                <FormattedMessage id="common.cancel" />
              </BetButton>
              <BetButton onClick={() => null}>
                <div className="text-2xl i-heroicons-arrow-path-solid"></div>
                <FormattedMessage id="common.repeat" />
              </BetButton>
              <BetButton onClick={() => null}>
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
