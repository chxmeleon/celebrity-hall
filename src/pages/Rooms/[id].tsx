import { FormattedMessage } from 'react-intl'
import { clsx as cx } from 'clsx'
import { useState } from 'react'
import { BetButton } from '@/components/common/Button'
import { chipsImg } from '@/components/room/BetDesk/chips'
import { useSetup } from '@/contexts/SetupContext'
import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/room/BetDesk'
import ChatRoom from '@/components/room/Chatroom'
import {
  BeadPlate,
  BigRoad,
  BigEyeRoad,
  SmallRoad,
  CockroachRoad,
  AskGrid
} from '@/components/room/Roadmap'

const bgImage = cx`
  absolute bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg-2.webp')]
  before:absolute before:w-full before:h-full before:bg-great-theme blur-[2px] before:content-['']`

const Room = () => {
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
        className={`${
          isActive
            ? 'shadow-md shadow-theme-300 before:absolute before:left-1 before:top-2 before:w-7 before:h-4 before:rounded-full before:bg-theme-300 before:blur-md'
            : 'shadow shadow-theme-50/80'
        } rounded-full relative hover:cursor-pointer`}
      >
        <img src={item} alt="bet image" className="w-9" />
      </button>
    )
  })

  return (
    <div className="relative flex-col w-full h-full felx">
      <div className="relative w-full h-4/5">
        <div className="flex absolute flex-col w-full h-full">
          <div className="overflow-hidden relative shadow-2xl aspect-film drop-shadow-xl shadow-amber-100/20">
            <div className="w-full h-full absolute bg-teal-900 top-0 z-10"></div>
            {/* <img
              src={RoomTestImage}
              alt="test image"
              className="absolute w-full -translate-y-12 "
            /> */}
          </div>
        </div>
        <div className="flex relative flex-col justify-between items-center w-full h-full z-[2]">
          <div className="w-full h-[63%] flex justify-center">
          </div>
          <div className="flex-grow flex-shrink-0 w-full">
            <BetDesk isToggle={isChangedDesk} />
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-full h-10">
            <div className="flex items-center w-[24%]">
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
              </button>
              <div className="inline-flex px-2">
                <FormattedMessage id="screens.room.bet" />
                <p className="px-2">|</p>
                <p className="px-2">0</p>
              </div>
            </div>
            <div className="flex flex-grow justify-around items-center">
              {chipsButton}
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/50 text-theme-300">
                <button className="text-xl i-heroicons-play-pause-solid" />
              </div>
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-theme-50/50 text-theme-300">
                <button className="text-xl i-heroicons-pencil-square-20-solid" />
              </div>
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
