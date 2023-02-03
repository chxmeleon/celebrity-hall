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
  const { isTable } = useContext(RoomDataContext)
  const {
    selectedChip: mobileSelected,
    betState: mobileBetState,
    dispatchBet: mobileDispatch
  } = useContext(GamePlayContext)

  const {
    selectedChip: tableSelected,
    betState: tableBetState,
    dispatchBet: tableDispatch
  } = useContext(TablesContext)

  return (
    <div className="h-full px-2 grid gap-1 grid-rows-2 w-full [&_button]:relative">
      <div className="grid grid-cols-5 gap-1">
        <button
          disabled={isDisabled}
          onClick={() =>
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'playerDragonAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'playerDragonAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.playerDragonAmount
                : mobileBetState?.playerDragonAmount
            }
          />

          <div
            className={cx(
              'w-full text-grid-400 [&_p]:text-gray-300',
              isTable ? 'text-sm' : 'text-xs md:text-xl'
            )}
          >
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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'playerPairAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'playerPairAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.playerPairAmount
                : mobileBetState?.playerPairAmount
            }
          />
          <div
            className={cx(
              'w-full text-grid-400 [&_p]:text-gray-300',
              isTable ? 'text-sm' : 'text-xs md:text-xl'
            )}
          >
            <FormattedMessage id="common.playerPair" />
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>
        <button
          disabled={isDisabled}
          onClick={() =>
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'super6Amount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'super6Amount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.super6Amount
                : mobileBetState?.super6Amount
            }
          />
          <div
            className={cx(
              'm-auto w-full text-grid-200',
              isTable
                ? 'text-[10px] [&_p]:text-sm [&_p]:pt-0.5'
                : 'text-xs md:text-xl'
            )}
          >
            <div className="font-bold">SUPER 6</div>
            <p className="text-gray-300">1:20</p>
          </div>
        </button>
        <button
          disabled={isDisabled}
          onClick={() =>
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'dealerPairAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'dealerPairAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.dealerPairAmount
                : mobileBetState?.dealerPairAmount
            }
          />

          <div
            className={cx(
              'w-full text-grid-100 [&_p]:text-gray-300 ',
              isTable ? 'text-sm' : 'text-xs md:text-xl'
            )}
          >
            <div>
              <FormattedMessage id="common.dealerPair" />
            </div>
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>
        <button
          disabled={isDisabled}
          onClick={() =>
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'dealerDragonAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'dealerDragonAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.dealerDragonAmount
                : mobileBetState?.dealerDragonAmount
            }
          />

          <div
            className={cx(
              'w-full text-grid-100 [&_p]:text-gray-300 ',
              isTable ? 'text-sm' : 'text-xs md:text-xl'
            )}
          >
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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'bigAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'bigAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable ? tableBetState?.bigAmount : mobileBetState?.bigAmount
            }
          />
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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'playerAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'playerAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.playerAmount
                : mobileBetState?.playerAmount
            }
          />
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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'tieAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'tieAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable ? tableBetState?.tieAmount : mobileBetState?.tieAmount
            }
          />
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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'dealerAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'smallAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable
                ? tableBetState?.dealerAmount
                : mobileBetState?.dealerAmount
            }
          />

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
            isTable
              ? tableDispatch({
                  type: 'addChips',
                  target: 'smallAmount',
                  amount: chipsData?.[tableSelected]?.value
                })
              : mobileDispatch({
                  type: 'addChips',
                  target: 'smallAmount',
                  amount: chipsData?.[mobileSelected]?.value
                })
          }
          className={cx(
            'rounded-md bg-theme-75',
            isDisabled ? 'brightness-75' : ''
          )}
        >
          <BetArea
            target={
              isTable ? tableBetState?.smallAmount : mobileBetState?.smallAmount
            }
          />
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
