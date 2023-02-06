import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'
import RoomDataContext from '@/contexts/RoomDataContext'
import { clsx as cx } from 'clsx'

const BetArea: React.FC<{ target: number }> = ({ target }) => {
  return (
    <div
      className={cx(
        'flex absolute items-center inset-0 justify-center w-full h-full pointer-events-none'
      )}
    >
      {target > 0 ? (
        <div className={cx('relative flex w-8 h-8 text-[9px]')}>
          <div
            className={cx(
              'w-8 h-8 absolute top-0 left-0 flex justify-center items-center'
            )}
          >
            <img src="/chips/chip_null.webp" alt="chip image" />
          </div>
          <span
            className={cx('relative z-20 m-auto text-yellow-300 font-semibold')}
          >
            {numberFormmat(target)}
          </span>
        </div>
      ) : null}
    </div>
  )
}

const numberFormmat = (target: number) =>
  target >= 1000 && target < 10000 && (target / 1000).toString().length > 3
    ? (target / 1000).toFixed(1) + 'K'
    : target >= 1000 && target < 10000
    ? target / 1000 + 'K'
    : target >= 10000 && (target / 10000).toString().length > 4
    ? (target / 10000).toFixed(1) + 'W'
    : target >= 10000
    ? target / 10000 + 'W'
    : target

const SinglePlayerMobile: React.FC<{ isDisabled: boolean }> = ({
  isDisabled
}) => {
  const { isTablesPath } = useContext(RoomDataContext)

  const btnStyle = cx(
    'w-full h-full rounded-md bg-theme-75 relative [&_.ratio]:text-gray-300',
    isDisabled ? 'brightness-75' : ''
  )

  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)

  const betTarget = [
    'playerDragon',
    'playerPair',
    'super6',
    'dealerPair',
    'dealerDragon',
    'big',
    'player',
    'tie',
    'dealer',
    'small'
  ]

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-1 place-items-center px-2 w-full h-full">
      {betTarget.map((item, idx) => (
        <button
          key={item}
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addChips',
              target: item,
              amount: chipsData?.[selectedChip]?.value
            })
          }
          className={btnStyle}
        >
          <BetArea target={betState[item]} />
          <div className={cx(betAreaMapper[item].textStyle)}>
            {idx > 4 ? (
              <div className="text-xl font-bold">
                <FormattedMessage id={betAreaMapper[item].id} />
              </div>
            ) : (
              <div
                className={cx(
                  'font-bold',
                  isTablesPath ? 'text-[12px]' : 'text-xs md:text-xl'
                )}
              >
                <FormattedMessage id={betAreaMapper[item].id} />
              </div>
            )}
            <p className="ratio">{betAreaMapper[item].text}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

const betAreaMapper = {
  player: {
    textStyle: 'w-full text-grid-400 [&_p]:text-sm',
    id: 'common.simplePlayer',
    text: '1:1'
  },
  playerPair: {
    textStyle: 'w-full text-grid-400',
    id: 'common.playerPair',
    text: '1:11'
  },
  playerDragon: {
    textStyle: 'w-full text-grid-400',
    id: 'common.playerDragon',
    text: '1:30'
  },
  dealer: {
    textStyle: 'w-full text-grid-100 [&_p]:text-sm',
    id: 'common.simpleDealer',
    text: '1:1'
  },
  dealerPair: {
    textStyle: 'w-full text-grid-100',
    id: 'common.dealerPair',
    text: '1:11'
  },
  dealerDragon: {
    textStyle: 'w-full text-grid-100',
    id: 'common.dealerDragon',
    text: '1:30'
  },
  super6: {
    textStyle: 'w-full text-grid-200 ',
    id: 'common.super6',
    text: '1:20'
  },
  tie: {
    textStyle: 'text-grid-300 [&_p]:text-sm',
    id: 'common.simpleTie',
    text: '1:8'
  },
  big: {
    textStyle: 'text-gray-300  [&_p]:text-sm',
    id: 'screens.baccaratRoom.big',
    text: '1:0.54'
  },
  small: {
    textStyle: 'text-gray-300  [&_p]:text-sm',
    id: 'screens.baccaratRoom.small',
    text: '1:1.15'
  }
}

export default SinglePlayerMobile
