import { gifList } from '@/libs/gifList'

interface GifPorps {
  clickRef: React.LegacyRef<HTMLImageElement> | undefined
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  onClick: React.MouseEventHandler<HTMLDivElement>
  sendGif: (e: React.MouseEvent, src: string) => Promise<void>
}

const GifPicker: React.FC<GifPorps> = ({
  clickRef,
  onClick,
  isShow,
  setIsShow,
  sendGif
}) => {
  return (
    <div ref={clickRef}>
      <div
        className={`${
          isShow ? '' : 'hidden'
        } absolute right-0 bottom-9 z-30 my-1 w-full`}
      >
        <div className="overflow-y-auto px-3 pt-5 pb-5 w-full  bg-white rounded-md border border-gray-300 h-56">
          <div className=" grid grid-cols-3 grid-rows-2 grid-flow-row gap-4 w-full hover:cursor-pointer ">
            {gifList.map((item, idx) => {
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
      <div className="absolute z-10 px-1 right-[112px] bottom-[9px]">
        <div
          onClick={onClick}
          className="text-2xl hover:cursor-pointer text-theme-50/40 i-heroicons-gif-solid"
        ></div>
      </div>
    </div>
  )
}

export default GifPicker
