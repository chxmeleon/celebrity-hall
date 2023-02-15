import { btnIdx, btnIdxNoBorder } from './deskStyle'
import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'
import { clsx as cx } from 'clsx'
import { numberFormmat } from '@/hooks/bet'

const betAreaMapper = {
  ver: { firstDiv: 'items-end', secoundDiv: 'w-14 h-14 text-sm' },
  hoz: { firstDiv: 'items-center', secoundDiv: 'w-10 h-10 text-xs' }
}

const BetArea: React.FC<{ target: number; type: string }> = ({
  target,
  type
}) => {
  return (
    <div
      className={cx(
        'flex absolute inset-0 justify-center w-full h-full pointer-events-none pb-2',
        betAreaMapper[type].firstDiv
      )}
    >
      <div
        className={cx(
          'relative flex chip-skew',
          betAreaMapper[type].secoundDiv,
          target > 0 ? 'block' : 'hidden'
        )}
      >
        <div
          className={cx(
            'absolute top-0 left-0 flex justify-center items-center  ',
            betAreaMapper[type].secoundDiv
          )}
        >
          <img src="/chips/chip_null.webp" alt="chip image" />
        </div>
        <span
          className={cx(
            'relative z-20 m-auto text-yellow-300 font-semibold',
            (target / 1000).toString().length > 3 &&
              target >= 1000 &&
              target < 10000
              ? 'text-[9px] font-bold'
              : (target / 10000).toString().length > 3 && target >= 10000
              ? 'text-[9px] font-bold'
              : ''
          )}
        >
          {numberFormmat(target)}
        </span>
      </div>
    </div>
  )
}

export const SinglePlayer: React.FC<{ isDisabled: boolean, selectedChip: {[key: string]: string} }> = ({
  isDisabled,
  selectedChip
}) => {
  const { betState, dispatchBet, isNoFee } =
    useContext(GamePlayContext)

  return (
    <div className="relative w-full h-full">
      <div className="absolute grid grid-cols-3 m-auto pb-2 w-[89%] h-full inset-0 z-30 pointer-events-none">
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <div className={cx(btnIdxNoBorder.tl5)}>
              <BetArea target={betState?.playerAny} type="hoz" />
            </div>
            <div className={cx(btnIdxNoBorder.tn4)}>
              <BetArea target={betState?.playerPair} type="hoz" />
            </div>
          </div>

          <div className="grid grid-cols-9">
            <div className={cx(btnIdxNoBorder.cl5)}>
              <BetArea target={betState?.big} type="hoz" />
            </div>
            <div className={cx(btnIdxNoBorder.cn4)}>
              <BetArea target={betState?.playerDragon} type="hoz" />
            </div>
          </div>

          <div className="grid grid-cols-9">
            <div className="flex col-span-5">
              <div className={cx(btnIdxNoBorder.hbhln)}>
                <BetArea target={betState?.playerSingle} type="hoz" />
              </div>
              <div className={cx(btnIdxNoBorder.hbhn)}>
                <BetArea target={betState?.playerDouble} type="hoz" />
              </div>
            </div>
            <div className={cx(btnIdxNoBorder.bn4)}>
              <BetArea target={betState?.playerNatural} type="hoz" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className={cx(btnIdxNoBorder.ynn)}>
            <BetArea target={betState?.player} type="ver" />
          </div>
          <div className="flex flex-col h-full">
            <div className={cx(btnIdxNoBorder.thhn)}>
              <BetArea target={betState?.tie} type="ver" />
            </div>
            <div className={cx(btnIdxNoBorder.bhhn)}>
              <BetArea target={betState?.super6} type="ver" />
            </div>
          </div>
          <div className={cx(btnIdxNoBorder.ynn)}>
            <BetArea target={betState?.dealer} type="ver" />
          </div>
        </div>

        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <div className={cx(btnIdxNoBorder.tn4)}>
              <BetArea target={betState?.dealerPair} type="hoz" />
            </div>
            <div className={cx(btnIdxNoBorder.tr5)}>
              <BetArea target={betState?.dealerAny} type="hoz" />
            </div>
          </div>

          <div className="grid grid-cols-9">
            <div className={cx(btnIdxNoBorder.cn4)}>
              <BetArea target={betState?.dealerDragon} type="hoz" />
            </div>
            <div className={cx(btnIdxNoBorder.cr5)}>
              <BetArea target={betState?.small} type="hoz" />
            </div>
          </div>

          <div className="grid grid-cols-9">
            <div className={cx(btnIdxNoBorder.bn4)}>
              <BetArea target={betState?.dealerNatural} type="hoz" />
            </div>
            <div className="flex col-span-5">
              <div className={cx(btnIdxNoBorder.hbhn)}>
                <BetArea target={betState?.dealerDouble} type="hoz" />
              </div>
              <div className={cx(btnIdxNoBorder.hbhrn)}>
                <BetArea target={betState?.dealerSingle} type="hoz" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:text-lg [&_p]:font-light">
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <button
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'playerAny',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
                btnIdx.tl5
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
                  type: 'addChips',
                  target: 'playerPair',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
                btnIdx.tn4
              )}
            >
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
                  type: 'addChips',
                  target: 'big',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
                btnIdx.cl5
              )}
            >
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
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'playerDragon',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
                disabled={isDisabled}
                onClick={() =>
                  dispatchBet({
                    type: 'addChips',
                    target: 'playerSingle',
                    amount: chipsData?.[selectedChip.chips]?.value
                  })
                }
                className={cx(
                  isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
                disabled={isDisabled}
                onClick={() =>
                  dispatchBet({
                    type: 'addChips',
                    target: 'playerDouble',
                    amount: chipsData?.[selectedChip.chips]?.value
                  })
                }
                className={cx(
                  isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'playerNatural',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                'pb-1',
                isDisabled ? 'brightness-75 bg-theme-50/50 ' : '',
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
                type: 'addChips',
                target: 'player',
                amount: chipsData?.[selectedChip.chips]?.value
              })
            }
            className={cx(
              isDisabled
                ? 'brightness-75 bg-theme-50/50 hover:bg-theme-50/50 '
                : '',
              btnIdx.ynn
            )}
          >
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
                  type: 'addChips',
                  target: 'tie',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled
                  ? 'brightness-75 bg-theme-50/50 hover:bg-theme-50/50 '
                  : '',
                btnIdx.thhn
              )}
            >
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
              disabled={isNoFee ? isDisabled : true}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'super6',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isNoFee && !isDisabled ? '' : 'brightness-75',
                btnIdx.bhhn,
                'text-grid-200'
              )}
            >
              <div className="m-auto w-2/3">
                <div className="font-bold">SUPER 6</div>
                <p>1:20</p>
              </div>
            </button>
          </div>
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'dealer',
                amount: chipsData?.[selectedChip.chips]?.value
              })
            }
            className={cx(
              isDisabled
                ? 'brightness-75 bg-theme-50/50 hover:bg-theme-50/50 '
                : '',
              btnIdx.ynn
            )}
          >
            <div className="m-auto w-2/3 text-grid-100">
              <div className="text-4xl font-bold">
                <FormattedMessage id="common.simpleDealer" />
              </div>
              <div>{isNoFee ? <p>1:1</p> : <p>1:0.95</p>}</div>
            </div>
          </button>
        </div>
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-9">
            <button
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'dealerPair',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled
                  ? 'brightness-75 bg-theme-50/50 hover:bg-theme-50/50 '
                  : '',
                btnIdx.tn4
              )}
            >
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
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'dealerAny',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'dealerDragon',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'bg-theme-50/50  brightness-75' : '',
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
                  type: 'addChips',
                  target: 'small',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled
                  ? 'brightness-75 bg-theme-50/50 hover:bg-theme-50/50 '
                  : '',
                btnIdx.cr5
              )}
            >
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
              disabled={isDisabled}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target: 'dealerNatural',
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                'pb-1',
                isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
                disabled={isDisabled}
                onClick={() =>
                  dispatchBet({
                    type: 'addChips',
                    target: 'dealerDouble',
                    amount: chipsData?.[selectedChip.chips]?.value
                  })
                }
                className={cx(
                  isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
                disabled={isDisabled}
                onClick={() =>
                  dispatchBet({
                    type: 'addChips',
                    target: 'dealerSingle',
                    amount: chipsData?.[selectedChip.chips]?.value
                  })
                }
                className={cx(
                  isDisabled ? 'brightness-75 bg-theme-50/50' : '',
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
    </div>
  )
}
