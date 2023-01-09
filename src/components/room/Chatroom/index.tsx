import React, { useState, useEffect } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

// interface ChatRoomProps {
//   roomId: number
//   contents: ChatContent[]
// }

const ChatRoom = () => {
  const [messages, setMessages] = useState<Array<string>>([])
  const [newMessage, setNewMessage] = useState('')
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [clickRef, setClickRef] = useState<HTMLDivElement | null>(null)
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null)

  const onTrigglerPicker = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPickerShow(!isPickerShow)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!clickRef?.contains(e.target as Node | null)) {
        setIsPickerShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickRef, isPickerShow])

  const scrollToBottom = () => {
    if (messageRef) {
      messageRef.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const onPicked = (emoji: EmojiClickData, event: MouseEvent) => {
    setNewMessage(newMessage + emoji.emoji)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage === '') {
      e.stopPropagation()
    } else {
      setTimeout(() => {
        setMessages((messages) => [...messages, newMessage])
      }, 150)
    }
    setNewMessage('')
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 border-b-2 border-gray-500">
      <div className="flex overflow-x-hidden flex-col-reverse flex-grow-0 w-full h-screen">
        <div
          ref={setMessageRef}
          id="chat-content"
          className="flex flex-col justify-end w-full h-full"
        >
          {messages.map((item, idx) => {
            return (
              <div
                className="flex justify-start items-start py-1 px-2.5 w-full h-auto text-theme-50"
                key={idx}
              >
                <div className="flex-shrink-0 pr-1.5 pt-[1.5px]">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </div>
                <p className="pr-2">username</p>
                <div className="inline-flex justify-start items-start">
                  <div className="w-2 rounded-t-lg translate-y-2 -rotate-[9deg] -translate-x-[1px]">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-neutral-200"></div>
                  </div>
                  <div className="break-all rounded-lg border-r-2 border-b-2 bg-neutral-200 drop-shadow-sm border-b-theme-50/10">
                    <p className="py-2 px-4">{item}</p>
                  </div>
                </div>
                <p className="self-end pl-3 text-gray-400">time</p>
              </div>
            )
          })}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex relative flex-grow justify-between items-center px-2 mt-1 mb-2 w-full"
      >
        <div className="inline-flex relative items-center px-0.5 mx-1 w-full h-full bg-gray-200 rounded-lg text-theme-50">
          <input
            id="chat-input"
            type="text"
            placeholder="Send message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="py-2 pl-3 pr-2 w-full h-full outline-0 rounded-md bg-gray-200"
            autoComplete="off"
          />

          <div ref={setClickRef}>
            <div
              className={`${
                isPickerShow ? '' : 'hidden'
              } absolute bottom-10 right-0 z-30`}
            >
              <EmojiPicker autoFocusSearch={false} onEmojiClick={onPicked} />
            </div>
            <div className="px-1">
              <div
                onClick={onTrigglerPicker}
                className="text-2xl i-mdi-emoticon-happy text-theme-50/40"
              ></div>
            </div>
          </div>
        </div>
        <div className="flex px-1 h-full">
          <button className="m-auto text-2xl text-amber-400 i-heroicons-paper-airplane-20-solid"></button>
        </div>
      </form>
    </div>
  )
}

export default ChatRoom
