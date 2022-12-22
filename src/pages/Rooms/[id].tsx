import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/BetDesk'
import ChatRoom from '@/components/Chatroom'
import { clsx as cx } from 'clsx'

const Room = () => {
  const bgImage = cx`absolute bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg.webp')]`

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-4/5">
        <div className={bgImage}></div>
        <div className="flex absolute flex-col w-full h-full">
          <div className="relative w-full h-[30%]"></div>
          <div className="overflow-hidden relative flex-grow w-full">
            <div className="relative w-full h-full bg-[#314531] rounded-t-[50%] bet-table-skew border-[30px] border-theme-50/80 border-b-0 shadow-inner shadow-black"></div>
          </div>
          <div className="relative w-full h-10 bg-theme-50/90"></div>
        </div>
        <div className="flex relative flex-col justify-between items-center w-full h-full z-[2]">
          <div className="w-full h-[54%]  flex justify-center">
            <div className="relative bg-black/80 aspect-video">
              <img src={RoomTestImage} alt="test image" />
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 w-full">
            <BetDesk />
          </div>
          <div className="w-full h-10 bg-theme-50/5">tool</div>
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
