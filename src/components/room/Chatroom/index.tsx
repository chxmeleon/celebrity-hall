import React, { useState, useEffect, useRef } from 'react'
import { ChatContent } from './ChatContent'

// interface ChatRoomProps {
//   roomId: number
//   contents: ChatContent[]
// }

const ChatRoom = () => {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  const messageInput = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    setMessage('')
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-300">
      <div className="flex overflow-x-hidden flex-col-reverse flex-grow-0 mb-8 h-4/5 max-h-screen rounded-lg">
        <div id="content" className="flex flex-col justify-end items-stretch">
          <div className="py-2 px-8">
            <div className="overflow-hidden w-14 h-14 rounded-full"></div>
          </div>
          {/* {contents.map((content) => ( */}
          {/*   <ChatContent key={content.id} {...content} /> */}
          {/* ))} */}
          <div className="text-black">{message}</div>
        </div>
      </div>
      <div className="flex-grow h-14">
        <div className="flex justify-start items-center px-4 mb-4 w-full h-10">
          <div className="relative flex-grow flex-shrink min-w-0 h-10 bg-gray-300 rounded-xl border">
            <form className="flex relative" onSubmit={handleSubmit}>
              <input
                ref={messageInput}
                type="text"
                placeholder="Enter messages..."
                className="relative p-4 w-full h-10 text-black bg-gray-300 rounded-md border focus:outline-none border-theme-50"
                autoComplete="off"
              />
            </form>
          </div>
          <div className="pl-4">
            <button
              className="p-2 cursor-pointer bg-theme-200"
              onClick={handleSubmit}
            >
              <div className="i-heroicons-paper-airplane-solid"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
