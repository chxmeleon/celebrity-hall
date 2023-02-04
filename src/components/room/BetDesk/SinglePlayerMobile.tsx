import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useEffect, useReducer, useState } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'
import RoomDataContext from '@/contexts/RoomDataContext'
import { clsx as cx } from 'clsx'
import { useParams } from 'react-router-dom'
import { useCurrentGameState } from '@/hooks/rooms'
import TablesContext from '@/contexts/TablesContext'

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
  const { isRegular } = useSetup()
  const { isTable } = useContext(RoomDataContext)
  const btnStyle = cx(
    'rounded-md bg-theme-75 relative w-ful h-full',
    isDisabled ? 'brightness-75' : ''
  )

  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)

  const betTarget = [
    ['playerDragon', 'playerPair', 'super6', 'dealerPair', 'dealerDragon'],
    ['big', 'player', 'tie', 'dealer', 'small']
  ]

  return (
    <div className="grid grid-rows-2 gap-1 px-2 w-full h-full">
      <div className="grid grid-cols-5 gap-1 h-full">
        {betTarget[0].map((item) => (
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
            <div
              className={cx(
                betAreaMapper[item].textStyle,
                isTable ? 'text-sm' : 'text-xs md:text-xl'
              )}
            >
              <div>
                {item === 'super6' ? (
                  <p>super 6</p>
                ) : (
                  <FormattedMessage id={betAreaMapper[item].id} />
                )}
              </div>
              <div>
                <p>{betAreaMapper[item].text}</p>
              </div>
            </div>
          </button>
        ))}

        {/* <div className="grid grid-cols-5 gap-1"> */}
        {/*   {betTarget[1].map((item) => ( */}
        {/*     <button */}
        {/*       key={item} */}
        {/*       disabled={isDisabled} */}
        {/*       onClick={() => */}
        {/*         dispatchBet({ */}
        {/*           type: 'addChips', */}
        {/*           target: item, */}
        {/*           amount: chipsData?.[selectedChip]?.value */}
        {/*         }) */}
        {/*       } */}
        {/*       className={btnStyle} */}
        {/*     > */}
        {/*       <BetArea target={betState[item]} /> */}
        {/*       <div className={betAreaMapper[item].textStyle}> */}
        {/*         <div className="i18n"> */}
        {/*           <FormattedMessage id={betAreaMapper[item].id} /> */}
        {/*         </div> */}
        {/*         <div> */}
        {/*           <p>{betAreaMapper[item].text}</p> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </button> */}
        {/*   ))} */}
        {/* </div> */}
      </div>
    </div>
  )
}

const betAreaMapper = {
  player: {
    textStyle: 'w-full h-full text-grid-400 [&_p]:text-gray-300',
    id: 'common.simplePlayer',
    text: '1:1'
  },
  playerPair: {
    textStyle: 'w-full text-grid-400 [&_p]:text-gray-300',
    id: 'common.playerPair',
    text: '1:11'
  },
  playerDragon: {
    textStyle: 'w-full text-grid-400 [&_p]:text-gray-300',
    id: 'common.playerDragon',
    text: '1:30'
  },
  dealer: {
    textStyle: 'w-full text-grid-100 [&_p]:text-gray-300',
    id: 'common.simpleDealer',
    text: '1:1'
  },
  dealerPair: {
    textStyle: 'w-full text-grid-100 [&_p]:text-gray-300',
    id: 'common.dealerPair',
    text: '1:11'
  },
  dealerDragon: {
    textStyle: 'w-full text-grid-100 [&_p]:text-gray-300',
    id: 'common.dealerDragon',
    text: '1:30'
  },
  super6: {
    textStyle: 'w-full text-grid-200',
    id: 'common.super6',
    text: '1:20'
  },
  tie: {
    textStyle: 'm-auto w-2/3 text-grid-300 [&_p]:text-gray-300',
    id: 'common.simpleTie',
    text: '1:8'
  },
  big: {
    textStyle:
      'm-auto w-full text-gray-300 [&_.i18n]:text-xl [&_.i18n]:font-bold [&_p]:text-sm',
    id: 'screens.baccaratRoom.big',
    text: '1:0.54'
  },
  small: {
    textStyle:
      'm-auto w-2/3 text-gray-300 [&_.i18n]:text-xl [&_.i18n]:font-bold [&_p]:text-sm',
    id: 'screens.baccaratRoom.small',
    text: '1:30'
  }
}

export default SinglePlayerMobile
