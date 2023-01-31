import { btnIdx } from './deskStyle'
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
    <div className="pointer-events-none flex absolute top-0 z-20 flex-col-reverse px-2 w-full h-[84%] chip-skew">
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

const BetAreaHoz: React.FC<{ target: string[] }> = ({ target }) => {
  return (
    <div className="pointer-events-none flex absolute top-0 z-20 flex-col-reverse px-2 w-full h-[180%] chip-h-skew">
      <div className="absolute rotate-180 w-full items-stretch h-[42%] flex flex-col flex-wrap-reverse">
        {target?.map((item: string, idx: number) => {
          return (
            <div className="-mb-6 w-7 h-auto" key={idx}>
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

const BetAreaHozL: React.FC<{ target: string[] }> = ({ target }) => {
  return (
    <div className="pointer-events-none flex absolute top-0 z-20 flex-col-reverse px-2 w-full h-[180%] chip-hw-skew">
      <div className="absolute rotate-180 w-full items-stretch h-[42%] flex flex-col flex-wrap-reverse">
        {target?.map((item: string, idx: number) => {
          return (
            <div className="-mb-7 w-7 h-auto" key={idx}>
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

export const SinglePlayer: React.FC<{ isDisabled: boolean }> = ({
  isDisabled
}) => {
  const { isRegular } = useSetup()
  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)

  return (
    <div className="grid grid-cols-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:text-lg [&_p]:font-light">
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-9">
          <button
            disabled
            className={cx(
              btnIdx.tl5,
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
            )}
          >
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:5</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.playerAny" />
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
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.tn4
            )}
          >
            <BetAreaHoz target={betState?.playerPairChips} />
            <div className="text-lg flex justify-between items-center px-3 w-full text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:11</p>
              </div>
              <div>
                <FormattedMessage id="common.playerPair" />
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
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
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.cl5
            )}
          >
            <BetAreaHozL target={betState?.bigChips} />
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:0.54</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.big" />
              </div>
            </div>
          </button>
          <button
            disabled
            className={cx(
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
              btnIdx.cn4
            )}
          >
            <div className="flex justify-between items-center px-3 w-full text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:30</p>
              </div>
              <div className="text-lg">
                <FormattedMessage id="common.playerDragon" />
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
          <div className="flex col-span-5">
            <button
              disabled
              className={cx(
                'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
                btnIdx.hbhln
              )}
            >
              <div className="text-xs flex justify-between items-center px-2 text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <p>1:0.96</p>
                </div>
                <div>
                  <FormattedMessage id="screens.baccaratRoom.playerSingle" />
                </div>
              </div>
            </button>
            <button
              disabled
              className={cx(
                'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
                btnIdx.hbhn
              )}
            >
              <div className="text-xs flex justify-between items-center px-2 w-full text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <p>1:0.9</p>
                </div>
                <div>
                  <FormattedMessage id="screens.baccaratRoom.playerDouble" />
                </div>
              </div>
            </button>
          </div>
          <button
            disabled
            className={cx(
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed pb-1',
              btnIdx.bn4
            )}
          >
            <div className="flex justify-between items-center px-3 pt-2 w-full text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:4</p>
              </div>
              <div className="text-lg">
                <FormattedMessage id="common.playerNatural" />
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
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
            isDisabled
              ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
              : '',
            btnIdx.ynn
          )}
        >
          <BetAreaVer target={betState?.playerChips} />
          <div className="m-auto w-2/3 text-grid-400">
            <div className="text-4xl font-bold">
              <FormattedMessage id="common.simplePlayer" />
            </div>
            <div>
              <p>1:1</p>
            </div>
          </div>
        </button>
        <div className="flex flex-col h-full">
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
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.thhn
            )}
          >
            <BetAreaHoz target={betState?.tieChips} />
            <div className="flex justify-between items-center m-auto w-2/3 text-grid-300">
              <div className="text-4xl font-bold">
                <FormattedMessage id="common.simpleTie" />
              </div>
              <div>
                <p>1:8</p>
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
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.bhhn
            )}
          >

            <BetAreaHoz target={betState?.super6Chips} />
            <div className="m-auto w-2/3 text-grid-200">
              <div className="font-bold">SUPER 6</div>
              <p>1:20</p>
            </div>
          </button>
        </div>
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
            isDisabled
              ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
              : '',
            btnIdx.ynn
          )}
        >
          <BetAreaVer target={betState?.dealerChips} />
          <div className="m-auto w-2/3 text-grid-100">
            <div className="text-4xl font-bold">
              <FormattedMessage id="common.simpleDealer" />
            </div>
            <div>{isRegular ? <p>1:1</p> : <p>1:0.95</p>}</div>
          </div>
        </button>
      </div>
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-9">
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
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.tn4
            )}
          >
            <BetAreaHoz target={betState?.dealerPairChips} />
            <div className="text-lg flex justify-between items-center px-3 w-full text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <FormattedMessage id="common.dealerPair" />
              </div>
              <div>
                <p>1:11</p>
              </div>
            </div>
          </button>
          <button
            disabled
            className={cx(
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
              btnIdx.tr5
            )}
          >
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <FormattedMessage id="screens.baccaratRoom.dealerAny" />
              </div>
              <div>
                <p>1:25</p>
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
          <button
            disabled
            className={cx(
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
              btnIdx.cn4
            )}
          >
            <div className="flex justify-between items-center px-3 w-full text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
              <div className="text-lg">
                <FormattedMessage id="common.dealerDragon" />
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
                type: 'addSmallChips',
                playload: {
                  smallChips: chipsData?.[selectedChip]?.src,
                  smallAmount: chipsData?.[selectedChip]?.value
                }
              })
            }
            className={cx(
              isDisabled
                ? 'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed'
                : '',
              btnIdx.cr5
            )}
          >
            <BetAreaHozL target={betState?.smallChips} />
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <FormattedMessage id="screens.baccaratRoom.small" />
              </div>
              <div>
                <p>1:0.54</p>
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
          <button
            disabled
            className={cx(
              'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed pb-1',
              btnIdx.bn4
            )}
          >
            <div className="flex justify-between items-center px-3 pt-2 w-full text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
              <div className="text-lg">
                <FormattedMessage id="common.dealerNatural" />
              </div>
              <div>
                <p>1:4</p>
              </div>
            </div>
          </button>
          <div className="flex col-span-5">
            <button
              disabled
              className={cx(
                'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
                btnIdx.hbhn
              )}
            >
              <div className="text-xs flex justify-between items-center px-2 text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <FormattedMessage id="screens.baccaratRoom.dealerDouble" />
                </div>
                <div>
                  <p>1:0.94</p>
                </div>
              </div>
            </button>
            <button
              disabled
              className={cx(
                'bg-theme-50/10 hover:bg-theme-50/10 cursor-not-allowed',
                btnIdx.hbhrn
              )}
            >
              <div className="text-xs flex justify-between items-center px-2 text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <FormattedMessage id="screens.baccaratRoom.dealerSingle" />
                </div>
                <div>
                  <p>1:0.94</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
