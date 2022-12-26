import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/BetDesk'
import ChatRoom from '@/components/Chatroom'
import { FormattedMessage } from 'react-intl'
import { clsx as cx } from 'clsx'
import { useSetup } from '@/hooks/useSetup'
import { useState } from 'react'
import { BetButton } from '@/components/Button'
import { chipsImg } from '@/components/BetDesk/chips'

const Room = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const onToggle = () => setIsToggle((isToggle) => !isToggle)
  const { handleRegularToggle, isRegular } = useSetup()

  const [betPrice, setBetPrice] = useState('')
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
          isActive ? 'shadow-md shadow-theme-300' : 'shadow shadow-theme-50/80'
        } rounded-full relative hover:cursor-pointer`}
      >
        {isActive && (
          <div className="absolute left-1 top-2 w-7 h-4 rounded-full bg-theme-300 blur-md"></div>
        )}
        <img src={item} alt="bet image" className="w-9" />
      </button>
    )
  })

  const bgImage = cx`
    absolute bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg-2.webp')]
    before:absolute before:w-full before:h-full before:bg-great-theme blur-[2px] before:content-['']`

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-4/5">
        <div className={bgImage}></div>
        <div className="flex absolute flex-col w-full h-full outline outline-theme-50">
          <div className="relative w-full h-[25%]"></div>
          <div className="overflow-hidden relative flex-grow w-full">
            <div className="relative w-full h-full bg-[#3C4141] rounded-t-[50%] bet-table-skew border-[50px] border-theme-50/80 border-b-0 shadow-inner shadow-black"></div>
          </div>
        </div>
        <div className="flex relative flex-col justify-between items-center w-full h-full z-[2]">
          <div className="w-full h-[63%] flex justify-center">
            <div className="overflow-hidden relative shadow-2xl aspect-film drop-shadow-xl shadow-amber-100/20">
              <img
                src={RoomTestImage}
                alt="test image"
                className="absolute w-full -translate-y-12"
              />
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 w-full">
            <BetDesk isToggle={isToggle} />
          </div>
          <div className="flex justify-between items-center px-2 my-2 w-full h-10">
            <div className="flex items-center w-[24%]">
              <button
                onClick={onToggle}
                className={`${
                  isToggle
                    ? 'text-theme-70 bg-theme-300 '
                    : 'bg-theme-70 text-theme-300'
                } inline-flex p-2 text-2xl rounded-full `}
              >
                <div
                  className={`${
                    isToggle
                      ? 'i-heroicons-user-solid'
                      : 'i-heroicons-user-group-20-solid'
                  } text-2xl `}
                ></div>
              </button>
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
              <div className="px-2">投注 | 0</div>
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
      <div className="flex w-full h-1/5 bg-gray-800">
        <div className="flex flex-grow justify-start">
          <div className="w-1/3">bead plate</div>
          <div className="flex w-2/3">
            <div className="block flex-grow w-full">
              <div className="h-2/3"></div>
              <div className="flex w-full h-1/3">
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
              </div>
            </div>
            <div className="w-1/4"></div>
          </div>
        </div>
        <div></div>
        <div className="w-2/6">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}

export default Room
