import { gifList } from '@/libs/gifList'
import React, { useState } from 'react'
import { clsx as cx } from 'clsx'

interface GifPorps {
  clickRef: React.LegacyRef<HTMLImageElement> | undefined
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  onClick: React.MouseEventHandler<HTMLDivElement>
  sendGif: (e: React.MouseEvent, src: string) => Promise<void>
}

const gifTab = ['ainti', 'gon', 'pigro', 'cat']

const GifPicker: React.FC<GifPorps> = ({
  clickRef,
  onClick,
  isShow,
  setIsShow,
  sendGif
}) => {
  const [selectedTab, setSelectedTab] = useState('ainti')
  return (
    <div ref={clickRef}>
      <div
        className={`${
          isShow ? '' : 'hidden'
        } absolute bottom-0 right-0 md:bottom-9 z-30 md:my-1 w-full`}
      >
        <div className="relative overflow-y-auto px-4  w-full h-56 bg-white rounded-md border border-gray-300 ">
          <div className="fixed inline-flex gap-3 py-3 w-[330px] font-bold text-theme-50/80 bg-white">
            {gifTab.map((item, idx) => {
              const isActive = selectedTab === item
              return (
                <div
                  key={idx}
                  id={item}
                  className={cx(
                    isActive ? 'bg-sky-200' : '',
                    'hover:cursor-pointer hover:bg-sky-200 p-2 rounded-md'
                  )}
                  onClick={(e) => setSelectedTab(e.currentTarget.id)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              )
            })}
          </div>
          <div className="pt-20 grid grid-cols-3 grid-rows-2 grid-flow-row gap-4 w-full hover:cursor-pointer">
            {gifList[selectedTab].map((item, idx) => {
              return (
                <button
                  onClick={(e: React.MouseEvent) => {
                    sendGif(e, item.src)
                    setIsShow(false)
                  }}
                  key={`gif-${idx}`}
                  id={item.name}
                  className="p-2 m-auto w-20 text-red-800 rounded-md hover:bg-gray-200"
                >
                  <div className="m-auto w-16 h-16">
                    <img
                      src={item.src}
                      alt="gift image"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="absolute z-10 px-1 top-[9px] right-[112px] md:bottom-[9px]">
        <div
          onClick={onClick}
          className="text-2xl hover:cursor-pointer text-theme-50/40 i-heroicons-gif-solid"
        ></div>
      </div>
    </div>
  )
}

export default GifPicker
