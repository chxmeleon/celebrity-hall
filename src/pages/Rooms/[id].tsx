import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/BetDesk'
import ChatRoom from '@/components/Chatroom'
import { clsx as cx } from 'clsx'
import { useState } from 'react'

const Room = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const onToggle = () => setIsToggle((isToggle) => !isToggle)

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
          <div className="flex items-center px-2 my-2 w-full h-10">
            <button
              onClick={onToggle}
              className={`${
                isToggle
                  ? 'text-theme-50 bg-gray-200 '
                  : 'bg-theme-70 text-theme-300'
              } inline-flex p-2 text-2xl rounded-full `}
            >
              <div
                className={`${
                  isToggle
                    ? 'i-heroicons-user text-theme-50'
                    : 'i-heroicons-user-group-20-solid'
                } text-2xl `}
              ></div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full h-1/5 bg-gray-800">
        <div className="flex justify-start w-full">
          <div>
            <div>bead plate</div>
            <div>
              <div></div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div></div>
        <div className="w-50">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}

export default Room
