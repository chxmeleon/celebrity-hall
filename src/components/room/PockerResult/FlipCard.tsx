import React, { useEffect, useState } from 'react'
import { clsx as cx } from 'clsx'

const Card: React.FC<{
  item: string
  rotate90?: boolean
  isOpen: boolean
  index: number
  isTable?: boolean
}> = ({ item, rotate90, index, isOpen, isTable }) => {
  const [isCardOpen, setIsCardOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsCardOpen(true)
      }, 500 * (index + 1))
    } else {
      setIsCardOpen(false)
    }
  }, [index, isOpen])

  return (
    <div className={rotate90 ? 'rotate-90 col-span-2 m-auto pl-1' : ''}>
      <div
        className={cx(
          isTable ? 'w-11' : "w-[52px]",
          isCardOpen ? 'md:rotate-y-0' : ' opacity-0 md:-rotate-y-180',
          'transition-all duration-200 ease-in-out relative  m-auto will-change-transform'
        )}
      >
        <img src={`/cards/${item}.webp`} alt="pocker image" />
        <div
          className={`will-change-transform hidden md:absolute top-0 left-0 transition-all duration-200 ease-in-out ${
            isCardOpen ? 'rotate-y-90 z-[-1]' : 'rotate-y-0 z-0'
          }`}
        >
          <img src="/cards/card_b.webp" alt="card back" />
        </div>
      </div>
    </div>
  )
}

const FlipCard: React.FC<{
  data: string[]
  isTable?: boolean
}> = ({ data, isTable }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (data) {
      data?.map((val, idx) => {
        setTimeout(() => {
          setIsOpen(true)
        }, 500 * (idx + 1))
      })
    }
  }, [data, isOpen])

  return (
    <div className="flex flex-grow justify-center pt-2 w-full">
      <div className="grid grid-cols-2 grid-flow-row auto-cols-fr px-2 w-full h-full">
        {data?.map((item, idx) => (
          <Card
            key={idx}
            isOpen={isOpen}
            index={idx}
            item={item}
            rotate90={idx === 2}
            isTable={isTable}
          />
        ))}
      </div>
    </div>
  )
}

export default FlipCard
