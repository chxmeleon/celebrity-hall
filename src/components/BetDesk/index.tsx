import React from 'react'

const BetDesk = () => {
  return (
    <div className="grid grid-rows-3 m-auto w-[91%] h-full bet-skew px-2 pb-6 ">
      <div className="grid grid-cols-11">
        <div className="border border-gray-300/70 col-span-2 rounded-tl-full border-l-2 border-t-2"></div>
        <div className="border border-gray-300/70 col-span-2 border-t-2"></div>
        <div className="border border-gray-300/70 col-span-3 border-t-2"></div>
        <div className="border border-gray-300/70 col-span-2 border-t-2"></div>
        <div className="border border-gray-300/70 col-span-2 rounded-tr-full border-t-2" ></div>
      </div>
      <div className="grid grid-cols-11">
        <div className="border border-gray-300/70 col-span-4 border-l-2"></div>
        <div className="border border-gray-300/70 col-span-3"></div>
        <div className="border border-gray-300/70 col-span-4 border-r-2"></div>
      </div>
      <div className="grid grid-cols-7">
        <div className="border border-gray-300/70 rounded-bl-full border-l-2 border-b-2"></div>
        <div className="border border-gray-300/70 border-b-2"></div>
        <div className="border border-gray-300/70 border-b-2"></div>
        <div className="border border-gray-300/70 border-b-2"></div>
        <div className="border border-gray-300/70 border-b-2"></div>
        <div className="border border-gray-300/70 border-b-2"></div>
        <div className="border border-gray-300/70 rounded-br-full  border-r-2 border-b-2"></div>
      </div>
    </div>
  )
}

export default BetDesk
