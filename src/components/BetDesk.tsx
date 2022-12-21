import React from 'react'

const BetDesk = () => {
  return (
    <div className="grid grid-rows-3 m-auto w-5/6 h-full rounded-full border-2 border-gray-300/70 b-skew">
      <div className="grid grid-cols-11">
        <div className="border border-gray-300/70 col-span-2"></div>
        <div className="border border-gray-300/70 col-span-2"></div>
        <div className="border border-gray-300/70 col-span-3"></div>
        <div className="border border-gray-300/70 col-span-2"></div>
        <div className="border border-gray-300/70 col-span-2"></div>
      </div>
      <div className="grid grid-cols-11">
        <div className="border border-gray-300/70 col-span-4"></div>
        <div className="border border-gray-300/70 col-span-3"></div>
        <div className="border border-gray-300/70 col-span-4"></div>
      </div>
      <div className="grid grid-cols-7">
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
        <div className="border border-gray-300/70"></div>
      </div>
    </div>
  )
}

export default BetDesk
