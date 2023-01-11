import { clsx as cx } from 'clsx'
import { FormattedMessage } from 'react-intl'
import { useEffect, useState } from 'react'

type cardsMapperProps = {
  dealer: {
    contentId: string
    default: string
    className: string
  }
  player: {
    contentId: string
    default: string
    className: string
  }
}

const cardsMapper: any = {
  dealer: {
    contentId: 'common.dealer',
    default: 'Dealer',
    className: 'bg-grid-100'
  },
  player: {
    contentId: 'common.player',
    default: 'Player',
    className: 'bg-grid-400'
  }
}

const data = [
  {
    bankerCards: ['1', '6'],
    playerCards: ['7', '12']
  },
  {
    bankerCards: ['24', '18'],
    playerCards: ['12', '10', '11']
  },
  {
    bankerCards: ['44', '52', '32'],
    playerCards: ['30', '8', '28']
  }
]

interface CardProps {
  role: string
  open: boolean
  /* isWin: boolean */
  /* isTie: boolean */
}

const PockerCard: React.FC<CardProps> = ({ role, open = true }) => {
  const titleStyle = cx(
    'flex justify-center items-center w-8 h-8 text-lg font-medium text-gray-50 rounded-full',
    cardsMapper[role].className
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isWin, setIsWin] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(open)
    }, 3000)
  }, [open])

  return (
    <div
      className={`flex flex-col items-center py-1 px-2 w-full h-full rounded-xl border-2 ${isWin ? 'border-theme-300 ' : 'border-transparent'
        }`}
    >
      <div className="flex justify-center items-center w-full h-1/4">
        <div className={titleStyle}>
          <FormattedMessage
            id={cardsMapper[role]?.contentId}
            defaultMessage={cardsMapper[role]?.default}
          />
        </div>
        <div className="flex pl-3 text-center text-gray-50">
          <p>point</p>
        </div>
      </div>
      <div className="flex flex-grow justify-center pt-2 w-full">
        <div className="flex flex-wrap justify-evenly w-5/6">
          {data[1].playerCards.map((item, idx) => {
            return (
              <div className="" key={idx}>
                {idx === 2 ? (
                  <div className="rotate-90">
                    <div
                      className={`${isOpen ? 'rotate-y-0' : 'rotate-y-180'
                        } transition-all duration-300 ease-in relative w-10`}
                    >
                      <img src={`/cards/${item}.webp`} alt="pocker image" />
                      <div
                        className={`absolute top-0 left-0 transition-all duration-300 ease-in ${isOpen ? '-rotate-y-90' : 'rotate-y-0'
                          }`}
                      >
                        <img src="/cards/card_b.webp" alt="card back" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${isOpen ? 'rotate-y-0' : 'rotate-y-180'
                      } transition-all duration-300 ease-in relative w-10`}
                  >
                    <img src={`/cards/${item}.webp`} alt="pocker image" />
                    <div
                      className={`absolute top-0 left-0 transition-all duration-300 ease-in ${isOpen ? '-rotate-y-90' : 'rotate-y-0'
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
      <div
        className={`${isWin ? '' : 'opacity-0'
          } flex flex-shrink-0 justify-evenly items-center px-4 w-full h-1/6 text-2xl font-medium text-[#eddc6a]`}
      >
        <img src="/win.svg" alt="win image" />
        <FormattedMessage id="common.win" defaultMessage="Win" />
      </div>
    </div>
  )
}

export default PockerCard
