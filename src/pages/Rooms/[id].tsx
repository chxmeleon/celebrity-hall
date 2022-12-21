import RoomTestImage from '@/assets/test.webp'
import BetDesk from '@/components/BetDesk'
import ChatRoom from '@/components/Chatroom'
import { clsx as cx } from 'clsx'

const Room = () => {
  const bgImage = cx`absolute  bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg.webp')]`

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-4/5">
        <div className={bgImage}></div>
        <div className="flex relative flex-col justify-between items-center w-full h-full z-[2]">
          <div className="w-full h-[56%] flex justify-center">
            <div className="bg-black/80 aspect-video"></div>
          </div>
          <div className="flex-grow py-6 px-2 w-full">
            <BetDesk />
          </div>
          <div className="w-full h-10 bg-gray-900">tool</div>
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
