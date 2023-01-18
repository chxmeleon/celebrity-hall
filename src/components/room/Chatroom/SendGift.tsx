import React, { useState } from 'react'
import { SEND_BACCARAT_GIFT } from '@/gql/chatroom'
import { useMutation, useQuery } from '@apollo/client'
import types from '@/types'
import { giftList } from '@/libs/giftlist'
import { useParams } from 'react-router-dom'
import { useCurrentGame } from '@/hooks/rooms'
import { FormattedMessage } from 'react-intl'
import { GET_PROFILE } from '@/gql/profile'
import defaultAvatar from '/user.png'

interface GiftPorps {
  clickRef: React.LegacyRef<HTMLImageElement> | undefined
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const SendGift: React.FC<GiftPorps> = ({
  clickRef,
  onClick,
  isShow,
  setIsShow
}) => {
  const [gift, setGift] = useState('rose')
  const [createGift] = useMutation<
    types.SEND_BACCARAT_GIFT,
    types.SEND_BACCARAT_GIFTVariables
  >(SEND_BACCARAT_GIFT)
  const { data: user } = useQuery(GET_PROFILE)
  const roomId = useParams()
  const { currentGame } = useCurrentGame(roomId?.id)
  const streamer = currentGame?.baccaratRoom?.girl
  const selectedGift = giftList.filter((key) => key.name === gift)
  const balance = user?.profile?.balance
  const [isDisable, setIsDisable] = useState(false)

  const handleSendGift = async (e: React.MouseEvent) => {
    if (user?.balance < selectedGift[0]?.value) {
      setIsDisable(true)
      e.preventDefault()
    } else {
      setIsDisable(false)
      try {
        const f = await createGift({
          variables: {
            input: {
              baccaratRoomId: roomId.id ?? '',
              gift: gift
            }
          }
        })
        console.log(f);
        
      } catch (error) {
        console.log(error)
      }
    }
    setIsShow(false)
  }

  return (
    <div ref={clickRef}>
      <div
        className={`${
          isShow ? '' : 'hidden'
        } absolute right-0 bottom-9 z-30 my-1 w-full`}
      >
        <div className="py-1 px-3 w-full h-full bg-white rounded-md border border-gray-300">
          <div className="flex justify-center items-center mb-1 w-full h-12 text-theme-50">
            <div className="overflow-hidden w-11 h-11 rounded-full">
              {streamer?.avatar === null ? (
                <img
                  src={defaultAvatar}
                  alt="streamer avatar"
                  className="object-cover object-top w-full h-full"
                />
              ) : (
                <img
                  src={streamer?.avatar ?? defaultAvatar}
                  alt="streamer avatar"
                  className="object-cover object-top w-full h-full"
                />
              )}
            </div>
            <p className="pl-2">{streamer?.name}</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-2 w-full h-44 hover:cursor-pointer">
            {giftList.map((item, idx) => {
              return (
                <div
                  onClick={() => setGift(item.name)}
                  key={`gift-${idx}`}
                  id={item.name}
                  className="p-2 m-auto w-20 rounded-md border shadow hover:bg-rose-400 border-gray-300/50 drop-shadow-md shadow-slate-300/50"
                >
                  <div className="m-auto w-9 h-9">
                    <img
                      src={item.image}
                      alt="gift image"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="pt-2 text-xs font-medium text-center">
                    {item.value}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between items-center w-full h-14">
            <div className="flex pl-2 text-theme-50">
              {isDisable ? (
                <>
                  <FormattedMessage
                    id="common.insufficientBalance"
                    defaultMessage="not enough"
                  />
                  <p className="pl-2">{balance}</p>
                </>
              ) : (
                <>
                  <FormattedMessage
                    id="creditRecord.send_gift"
                    defaultMessage="Send Gift"
                  />
                  <p className="px-1.5 font-medium text-rose-500">
                    <FormattedMessage id={`gift.${gift}`} defaultMessage=" " />
                  </p>
                  <FormattedMessage id="common.for" defaultMessage="for" />
                  <p>{streamer?.name}</p>
                </>
              )}
            </div>
            <div
              onClick={handleSendGift}
              className={`py-2 px-4 font-medium bg-amber-400 rounded-lg   ${
                isDisable
                  ? 'hover:cursor-not-allowed hover:bg-gray-300 pointer-events-none'
                  : 'hover:cursor-pointer active:bg-yellow-300 hover:text-theme-300 active:text-theme-50 hover:bg-orange-500'
              }`}
            >
              <FormattedMessage id="common.confirm" defaultMessage="Confirm" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-1">
        <div
          onClick={onClick}
          className="text-2xl hover:cursor-pointer text-theme-50/40 i-heroicons-gift-solid"
        ></div>
      </div>
    </div>
  )
}

export default SendGift
