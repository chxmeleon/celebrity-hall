import { PropsWithChildren } from 'react'

interface TileProps {
  status: string
}
export const Tile: React.FC<PropsWithChildren<TileProps>> = ({
  children,
  status,
}) => {
  return (
    <div className="flex w-full h-full text-gray-50 border-gray-400 border-[1px]">
      {status === 'b' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-blue-500 rounded-full">
          {children}
        </div>
      ) : status === 'p' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-red-500 rounded-full">
          {children}
        </div>
      ) : status === 'd' ? (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 bg-teal-500 rounded-full">
          {children}
        </div>
      ) : (
        <div className="flex justify-center items-center m-auto w-5/6 h-5/6 text-gray-50 rounded-full">
          <p>n</p>
        </div>
      )}
    </div>
  )
}
