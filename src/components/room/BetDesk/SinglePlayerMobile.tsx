import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useEffect, useReducer, useState } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'
import { useParams } from 'react-router-dom'
import { useCurrentGameState } from '@/hooks/rooms'

const BetAreaVer: React.FC<{ target: string[] }> = ({ target }) => {
  return (
    <div className="flex absolute top-0 z-20 flex-col-reverse px-2 w-full h-[84%] overflow-hidden">
      <div className="absolute rotate-180 w-full items-stretch h-[40%] flex flex-col flex-wrap-reverse">
        {target?.map((item: string, idx: number) => {
          return (
            <div className="-mb-5 w-7 h-auto" key={idx}>
              <img
                src={item}
                alt="chip image"
                className="inline-block rotate-180"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SinglePlayerMobile: React.FC<{ isDisabled: boolean }> = ({
  isDisabled
}) => {
  const { isRegular } = useSetup()
  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)
  return (
    <div className="px-2 grid gap-1 grid-rows-2 w-full h-3/5 px-1 [&_button]:relative">
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
          <BetAreaVer target={betState?.playerPairChips} />
          <div className="text-xs md:text-xl w-full text-grid-400 [&_p]:text-gray-300">
            <FormattedMessage id="screens.baccaratRoom.playerPair" />
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
          <BetAreaVer target={betState?.super6Chips} />
          <div className="text-xs md:text-xl m-auto w-full text-grid-200">
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
          <BetAreaVer target={betState?.dealerPairChips} />

          <div className="text-xs md:text-xl w-full text-grid-100 [&_p]:text-gray-300 ">
            <div>
              <FormattedMessage id="screens.baccaratRoom.dealerPair" />
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

      <div className="grid grid-cols-3 gap-1">
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
          <BetAreaVer target={betState?.playerChips} />
          <div className="m-auto w-2/3 text-grid-400 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.player" />
            </div>
            <div className='text-sm'>
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
          <BetAreaVer target={betState?.tieChips} />
          <div className="m-auto w-2/3 text-grid-300 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="common.simpleTie" />
            </div>
            <div className='text-sm'>
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
          <BetAreaVer target={betState?.dealerChips} />

          <div className="m-auto w-2/3 text-grid-100 [&_p]:text-gray-300">
            <div className="text-xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.dealer" />
            </div>
            <div className='text-sm'>{isRegular ? <p>1:1</p> : <p>1:0.95</p>}</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SinglePlayerMobile
