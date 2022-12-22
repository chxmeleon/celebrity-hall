import { btnIdx } from './deskStyle'
import { FormattedMessage } from 'react-intl'

export const SinglePlayer = () => {
  return (
    <>
      <div className="grid grid-cols-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 ">
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <div className="col-span-5 border border-t-2 border-l-2 border-gray-300/50"></div>
            <div className="col-span-4 border border-t-2 border-gray-300/50"></div>
          </div>
          <div className="grid grid-cols-9">
            <div className="col-span-5 border border-l-2 border-gray-300/50"></div>
            <div className="col-span-4 border border-gray-300/50"></div>
          </div>
          <div className="grid grid-cols-9">
            <div className="flex col-span-5">
              <div className="w-1/2 border border-b-2 border-l-2 border-gray-300/50"></div>
              <div className="w-1/2 border border-b-2 border-gray-300/50"></div>
            </div>
            <div className="col-span-4 border border-b-2 border-gray-300/50"></div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="border border-gray-300/50 border-y-2"></div>
          <div className="h-full">
            <div className="h-1/2 border border-gray-300/50 border-t-2"></div>
            <div className="h-1/2 border border-gray-300/50 border-b-2"></div>
          </div>
          <div className="border border-gray-300/50 border-y-2"></div>
        </div>
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <div className="col-span-4 border border-gray-300/50 border-t-2"></div>
            <div className="col-span-5 border border-gray-300/50 border-t-2 border-r-2"></div>
          </div>
          <div className="grid grid-cols-9">
            <div className="col-span-4 border border-gray-300/50 "></div>
            <div className="col-span-5 border border-gray-300/50 border-r-2"></div>
          </div>
          <div className="grid grid-cols-9">
            <div className="col-span-4 border border-gray-300/50 border-b-2"></div>
            <div className="flex col-span-5">
              <div className="w-1/2 border border-gray-300/50 border-b-2"></div>
              <div className="w-1/2 border border-gray-300/50 border-r-2 border-b-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
