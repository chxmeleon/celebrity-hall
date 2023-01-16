import React, { useState, useEffect, useCallback } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useParams } from 'react-router-dom'
import { useActionCable } from '@/contexts/ActionCableContext'
import { useIntl } from 'react-intl'
import { useMutation } from '@apollo/client'
import { CREATE_BACCARAT_MESSAGE } from '@/gql/chatroom'
import types from '@/types'
import { v4 as uuidV4 } from 'uuid'
import defaultAvatar from '/user.png'
import SendGift from './SendGift'
import { giftList } from '@/libs/giftlist'
import { useClickOutside } from '@/hooks/common'

type ContentProps = {
  avatar: string
  nickname: string
  body: string
  createdAt: string | undefined
}

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Array<ContentProps | null>>([])
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [isGiftShow, setIsGiftShow] = useState(false)
  const [clickRef, setClickRef] = useState<HTMLDivElement | null>(null)
  const [giftRef, setGiftRef] = useState<HTMLDivElement | null>(null)
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null)
  const { formatMessage } = useIntl()
  const [data, setData] = useState<any>({})
  const [createBaccaratMessage] = useMutation<
    types.CREATE_BACCARAT_MESSAGE,
    types.CREATE_BACCARAT_MESSAGEVariables
  >(CREATE_BACCARAT_MESSAGE)

  const roomId = useParams()
  const { cable } = useActionCable()

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: 'ChatroomChannel',
        roomId: roomId.id,
        roomType: 'BaccaratRoom'
      },
      {
        received: (data) => {
          if (data.message !== undefined) {
            setMessages((messages) => [...messages, data.message])
          }
          setData(data.message)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, data, messages])

  const onTrigglerPicker = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPickerShow((isPickerShow) => !isPickerShow)
  }

  const onTrigglerGift = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsGiftShow((isGiftShow) => !isGiftShow)
  }

  useClickOutside(clickRef, isPickerShow, setIsPickerShow)
  useClickOutside(giftRef, isGiftShow, setIsGiftShow)

  const scrollToBottom = () => {
    if (messageRef) {
      messageRef.scrollIntoView(false)
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length, scrollToBottom])

  const onPicked = (emoji: EmojiClickData, event: MouseEvent) => {
    setNewMessage(newMessage + emoji.emoji)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage === '') {
      e.stopPropagation()
    } else {
      await createBaccaratMessage({
        variables: {
          input: {
            baccaratRoomId: roomId.id ?? '',
            content: newMessage,
            uuid: uuidV4()
          }
        }
      })
      scrollToBottom()
    }
    setNewMessage('')
  }

  const isGiftMessage = data?.type === 'Message::Gift'

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 border-gray-500 border-b-1">
      <div className="flex overflow-x-hidden flex-col-reverse flex-grow-0 w-full h-screen scroll-smooth">
        <div
          id="chat-content"
          className="flex flex-col justify-end w-full h-full"
          ref={setMessageRef}
        >
          {messages?.map((content, idx) => {
            return (
              <>
                {isGiftMessage ? (
                  <div
                    key={`message-${idx}`}
                    className="flex justify-center items-center py-1 m-auto w-full"
                  >
                    <div className="p-0.5 m-auto w-2/3 text-center bg-pink-300 rounded-full text-theme-50">
                      {content?.body}
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex justify-start items-center py-1 px-2.5 w-full h-auto text-xs text-theme-50"
                    key={`message-${idx}`}
                  >
                    <div className="flex-shrink-0 pr-1.5 pt-[1.5px]">
                      <div className="overflow-hidden w-6 h-6 rounded-full bg-slate-200">
                        {content?.avatar === null ? (
                          <img
                            src={defaultAvatar}
                            alt="avatar img"
                            className="object-cover object-center w-full h-full"
                          />
                        ) : (
                          <img
                            src={content?.avatar ?? defaultAvatar}
                            alt="avatar img"
                            className="object-cover object-center w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                    <p className="pr-2 text-sm">{content?.nickname}</p>
                    <div className="inline-flex justify-start items-start">
                      <div className="w-2 rounded-t-lg translate-y-2 -rotate-[9deg] -translate-x-[1px]">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-neutral-200"></div>
                      </div>
                      <div className="break-all rounded-lg border-r-2 border-b-2 bg-neutral-200 drop-shadow-sm border-b-theme-50/10">
                        <p className="py-1 px-2 text-sm">{content?.body}</p>
                      </div>
                    </div>
                    <p className="self-end pl-3 text-xs text-gray-400">
                      {content?.createdAt?.slice(11, 16)}
                    </p>
                  </div>
                )}
              </>
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
            placeholder={formatMessage({
              id: 'common.sendMessage',
              defaultMessage: 'Send Message'
            })}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="py-2 pr-2 pl-3 w-full h-full bg-gray-200 rounded-md outline-0 focus:outline-0"
            autoComplete="off"
          />
          <SendGift
            clickRef={setGiftRef}
            isShow={isGiftShow}
            setIsShow={setIsGiftShow}
            onClick={onTrigglerGift}
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
