import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useEffect, useReducer, useState } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'
import { useParams } from 'react-router-dom'
import { useCurrentGameState } from '@/hooks/rooms'

const BetArea: React.FC<{ target: number }> = ({ target }) => {
  return (
    <div
      className={cx(
        'flex absolute items-center inset-0 justify-center w-full h-full pointer-events-none'
      )}
    >
      {target > 0 ? (
        <div className={cx('relative flex w-9 h-9 text-[9px]')}>
          <div
            className={cx(
              'w-9 h-9 absolute top-0 left-0 flex justify-center items-center'
            )}
          >
            <img src="/chips/chip_null.webp" alt="chip image" />
          </div>
          <span
            className={cx('relative z-20 m-auto text-yellow-300 font-semibold')}
          >
            {target >= 1000 && target < 10000
              ? target / 1000 + 'K'
              : target >= 10000
              ? target / 10000 + 'W'
              : target}
          </span>
        </div>
      ) : null}
    </div>
  )
}

const SinglePlayerMobile: React.FC<{ isDisabled: boolean }> = ({
  isDisabled
}) => {
  const { isRegular } = useSetup()
  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)
  return (
    <div className="px-2 grid gap-1 grid-rows-2 w-full  [&_button]:relative">
      <div className="grid grid-cols-5 gap-1">
        <button disabled className="rounded-md bg-theme-75 brightness-50">
          <div className="text-xs md:text-xl w-full text-grid-400 [&_p]:text-gray-300">
            <div>
              <FormattedMessage id="common.playerDragon" />
            </div>
            <div>
              <p>1:30</p>
            </div>
          </div>
        </button>

        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addPlayerPairChips',
              playload: {
                playerPairChips: chipsData?.[selectedChip]?.src,
                playerPairAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.playerPairAmount} />
          <div className="text-xs md:text-xl w-full text-grid-400 [&_p]:text-gray-300">
            <FormattedMessage id="common.playerPair" />
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>

        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addSuper6Chips',
              playload: {
                super6Chips: chipsData?.[selectedChip]?.src,
                super6Amount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.super6Amount} />
          <div className="m-auto w-full text-xs md:text-xl text-grid-200">
            <div className="font-bold">SUPER 6</div>
            <p className="text-gray-300">1:20</p>
          </div>
        </button>

        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addDealerPairChips',
              playload: {
                dealerPairChips: chipsData?.[selectedChip]?.src,
                dealerPairAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.dealerPairAmount} />

          <div className="text-xs md:text-xl w-full text-grid-100 [&_p]:text-gray-300 ">
            <div>
              <FormattedMessage id="common.dealerPair" />
            </div>
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>

        <button disabled className="rounded-md bg-theme-75 brightness-50">
          <div className="text-xs md:text-xl w-full text-grid-100 [&_p]:text-gray-300 ">
            <div className="">
              <FormattedMessage id="common.dealerDragon" />
            </div>
            <div>
              <p>1:30</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addBigChips',
              playload: {
                bigChips: chipsData?.[selectedChip]?.src,
                bigAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.bigAmount} />
          <div className="m-auto w-2/3 text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.big" />
            </div>
            <div className="text-sm">
              <p>1:0.54</p>
            </div>
          </div>
        </button>

        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addPlayerChips',
              playload: {
                playerChips: chipsData?.[selectedChip]?.src,
                playerAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.playerAmount} />
          <div className="m-auto w-2/3 text-grid-400 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="common.simplePlayer" />
            </div>
            <div className="text-sm">
              <p>1:1</p>
            </div>
          </div>
        </button>

        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addTieChips',
              playload: {
                tieChips: chipsData?.[selectedChip]?.src,
                tieAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.tieAmount} />
          <div className="m-auto w-2/3 text-grid-300 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="common.simpleTie" />
            </div>
            <div className="text-sm">
              <p>1:8</p>
            </div>
          </div>
        </button>
        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addDealerChips',
              playload: {
                dealerChips: chipsData?.[selectedChip]?.src,
                dealerAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.dealerAmount} />

          <div className="m-auto w-2/3 text-grid-100 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="common.simpleDealer" />
            </div>
            <div className="text-sm">
              {isRegular ? <p>1:1</p> : <p>1:0.95</p>}
            </div>
          </div>
        </button>
        <button
          disabled={isDisabled}
          onClick={() =>
            dispatchBet({
              type: 'addSmallChips',
              playload: {
                smallChips: chipsData?.[selectedChip]?.src,
                smallAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea target={betState?.smallAmount} />
          <div className="m-auto w-2/3 text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.small" />
            </div>
            <div className="text-sm">
              <p>1:1</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SinglePlayerMobile
