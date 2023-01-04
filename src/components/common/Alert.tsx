import React from 'react'
import ReactDOM from 'react-dom'

type AlertProps = {
  isError: boolean
}
const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  children,
  isError,
}) => {
  return (
    <div
      className={`${isError ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-20'
        } absolute w-full top-9 z-30 transition-all duration-500 ease-in-out`}
    >
      <div className="flex w-full">
        <div className="flex justify-between py-3 px-5 m-auto text-red-900 bg-red-400">
          <div className="text-2xl i-heroicons-information-circle-20-solid"></div>
          <div className="px-2">{children}</div>
        </div>
      </div > 
    </div> 
  )
}

export default Alert
