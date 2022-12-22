import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/BetDesk'
import ChatRoom from '@/components/Chatroom'
import { clsx as cx } from 'clsx'

const Room = () => {
  const bgImage = cx`
    absolute bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg-2.webp')]
    before:absolute before:w-full before:h-full before:bg-great-theme blur-[2px] before:content-['']`

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-4/5">
        <div className={bgImage}></div>
        <div className="flex absolute flex-col w-full h-full">
          <div className="relative w-full h-[30%]"></div>
          <div className="overflow-hidden relative flex-grow w-full">
            <div className="relative w-full h-full bg-[#3C4141] rounded-t-[50%] bet-table-skew border-[30px] border-theme-50/80 border-b-0 shadow-inner shadow-black"></div>
          </div>
          <div className="relative w-full h-10 bg-theme-50/90"></div>
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
            <BetDesk />
          </div>
          <div className="w-full h-11 bg-theme-50/5">tool</div>
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
