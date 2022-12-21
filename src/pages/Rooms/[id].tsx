import RoomTestImage from '@/assets/test.webp'
import ChatRoom from '@/components/Chatroom'
import { clsx as cx } from 'clsx'

const Room = () => {
  const bgImage = cx`bg-cover bg-center w-full h-full bg-no-repeat bg-[url('../assets/room-bg.webp')]`

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-4/5">
        <div className={bgImage}></div>
        <div className="w-12 h-12 border-2 border-white -skew-x-12"></div>
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
        <div className=" w-50">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}

export default Room
