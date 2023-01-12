import React, { useEffect, useState } from 'react'

const Card: React.FC<{
  item: string
  rotate90?: boolean
  isOpen: boolean
  index: number
}> = ({ item, rotate90, index, isOpen }) => {
  const [isCardOpen, setIsCardOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsCardOpen(true)
      }, 1000 * index)
    } else {
      setIsCardOpen(false)
    }
  }, [index, isOpen])

  return (
    <div className={rotate90 ? 'rotate-90' : ''}>
      <div
        className={`${
          isCardOpen ? 'rotate-y-0' : '-rotate-y-180'
        } transition-all duration-300 ease-in relative w-10`}
      >
        <img src={`/cards/${item}.webp`} alt="pocker image" />
        <div
          className={`absolute top-0 left-0 transition-all duration-300 ease-in ${
            isCardOpen ? 'z-[-1] rotate-y-180' : 'z-0 rotate-y-0'
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
}> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (data) {
      data?.map((val, idx) => {
        setTimeout(() => {
          setIsOpen(true)
        }, 1000 * idx)
      })
    }
  }, [data, isOpen])

  return (
    <div className="flex flex-grow justify-center pt-2 w-full">
      <div className="flex flex-wrap justify-evenly w-5/6">
        {data?.map((item, idx) => (
          <Card
            key={idx}
            isOpen={isOpen}
            index={idx}
            item={item}
            rotate90={idx === 2}
          />
        ))}
      </div>
    </div>
  )
}

export default FlipCard
