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
    messageRef?.scrollIntoView({ behavior: 'smooth' })
  }

  const onPicked = (emoji: EmojiClickData, event: MouseEvent) => {
    setNewMessage(newMessage + emoji.emoji)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage === '') {
      e.preventDefault()
    } else {
      setMessages((messages) => [...messages, newMessage])
    }
    setNewMessage('')
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 border-b-2 border-gray-500">
      <div className="flex overflow-x-hidden flex-col-reverse flex-grow-0 w-full h-screen">
        <div
          id="chat-content"
          className="flex flex-col justify-end items-stretch w-full h-full scroll-smooth"
        >
          {/* <div ref={setMessageRef}></div> */}
          {messages.map((item, idx) => {
            return (
              <div className="p-1 px-5 w-full" key={idx}>
                <p className="text-theme-50">{item}</p>
              </div>
            )
          })}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex relative flex-grow justify-between items-center px-1.5 mt-1 mb-2 w-full"
      >
        <div className="relative px-2 w-full h-full text-theme-50">
          <input
            id="chat-input"
            type="text"
            placeholder="Send message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="py-1 px-3 w-full h-full bg-gray-200 rounded-lg outline-transparent"
            autoComplete="off"
          />
        </div>
        <div className="flex h-full">
          <button className="m-auto text-2xl text-amber-400 i-heroicons-paper-airplane-20-solid"></button>
        </div>
        <div className="absolute bottom-0 right-10 z-20 justify-end items-center h-full pt-[1px]">
          <button
            onClick={onTrigglerPicker}
            className="text-2xl i-mdi-emoticon-happy text-theme-50/40"
          ></button>
        </div>
        <div
          ref={setClickRef}
          className={`${isPickerShow ? '' : 'hidden'} absolute bottom-8 z-30 `}
        >
          <EmojiPicker autoFocusSearch={false} onEmojiClick={onPicked} />
        </div>
      </form>
    </div>
  )
}

export default ChatRoom
