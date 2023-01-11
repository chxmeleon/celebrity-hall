import React from 'react'

type CardProps = {
  data: []
  isOpen: boolean
}

const FlipCard: React.FC<CardProps> = ({ data, isOpen }) => {
  return (
    <div className="flex flex-grow justify-center pt-2 w-full">
      <div className="flex flex-wrap justify-evenly w-5/6">
        {data?.map((item, idx) => {
          return (
            <div className="" key={idx}>
              {idx === 2 ? (
                <div className="rotate-90">
                  <div
                    className={`${isOpen ? 'rotate-y-0' : '-rotate-y-180'
                      } transition-all duration-300 ease-in relative w-10`}
                  >
                    <img src={`/cards/${item}.webp`} alt="pocker image" />
                    <div
                      className={`absolute top-0 left-0 transition-all duration-300 ease-in ${isOpen ? 'z-[-1] rotate-y-180' : 'z-0 rotate-y-0'
                        }`}
                    >
                      <img src="/cards/card_b.webp" alt="card back" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${isOpen ? 'rotate-y-0' : '-rotate-y-180'
                    } transition-all duration-300 ease-in relative w-10`}
                >
                  <img src={`/cards/${item}.webp`} alt="pocker image" />
                  <div
                    className={`absolute top-0 left-0 transition-all duration-300 ease-in ${isOpen ? 'z-[-1] rotate-y-180' : 'z-0 rotate-y-0'
                      }`}
                  >
                    <img src="/cards/card_b.webp" alt="card back" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlipCard
