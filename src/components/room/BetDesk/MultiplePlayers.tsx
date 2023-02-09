import { btnIdx, btnIdxNoBorder } from './deskStyle'
import { chipsData } from './chips'
import { clsx as cx } from 'clsx'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import GamePlayContext from '@/contexts/GamePlayContext'
import { numberFormmat } from '@/hooks/bet'
import { useWallet } from '@/hooks/profile'

type MultiProps = {
  isActive: boolean
  idx: number
}

const MultiGrid: React.FC<MultiProps> = ({ isActive, idx }) => {
  return (
    <>
      {idx === 0 ? (
        <div className={isActive ? btnIdx.isUserL : btnIdx.bln} />
      ) : idx === 6 ? (
        <div className={isActive ? btnIdx.isUserR : btnIdx.brn} />
      ) : (
        <div className={isActive ? btnIdx.isUserN : btnIdx.bnn} />
      )}
    </>
  )
}

const userData = [
  { username: '', balance: '' },
  { username: '', balance: '' },
  { username: '', balance: '' },
  { username: '', balance: '' },
  { username: '', balance: '' },
  { username: '', balance: '' },
  { username: '', balance: '' }
]

const multipleGrid = userData.map((item: any, idx: number) => {
  const isActive = item.username !== null && item.id === idx
  return <MultiGrid isActive={isActive} idx={idx} key={idx} />
})

const userInfo = userData.map((item, idx) => {
  return (
    <div key={idx} className="flex items-center p-1 w-full">
      <div className="flex flex-shrink-0 rounded-full bg-theme-50">
        <div className="m-auto w-10 h-10 text-white i-heroicons-user-circle-solid"></div>
      </div>
      <div className="pl-5 w-full">
        <p>{item.username}</p>
        <p className="text-amber-300">{item.balance}</p>
      </div>
    </div>
  )
})

const BetArea: React.FC<{ target: number }> = ({ target }) => {
  return (
    <div
      className={cx(
        'flex absolute items-center inset-0 justify-center w-full h-full pointer-events-none'
      )}
    >
      {target > 0 ? (
        <div className={cx('relative flex w-10 h-10 text-xs chip-skew')}>
          <div
            className={cx(
              'w-10 h-10 absolute top-0 left-0 flex justify-center items-center'
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
      ) : null}
    </div>
  )
}

export const MultiplePlayers: React.FC<{
  isDisabled: boolean
  targetsData: { [key: string]: [] }
}> = ({ isDisabled, targetsData }) => {
  const { selectedChip, betState, dispatchBet, isNoFee } =
    useContext(GamePlayContext)
  const { user } = useWallet()
  const { profile } = user


  return (
    <>
      <div className="grid absolute bottom-1 z-20 grid-rows-3 px-20 m-auto w-full h-full pointer-events-none">
        <div className="grid grid-cols-11">
          <div className={btnIdxNoBorder.tl2}>
            <BetArea target={betState?.playerDragon} />
          </div>
          <div className={btnIdxNoBorder.tn2}>
            <BetArea target={betState?.playerPair} />
          </div>
          <div className={btnIdxNoBorder.tn3}>
            <BetArea target={betState?.super6} />
          </div>
          <div className={btnIdxNoBorder.tn2}>
            <BetArea target={betState?.dealerPair} />
          </div>
          <div className={btnIdxNoBorder.tr2}>
            <BetArea target={betState?.dealerDragon} />
          </div>
        </div>
        <div className="grid grid-cols-11">
          <div className={btnIdxNoBorder.cl4}>
            <BetArea target={betState?.player} />
          </div>
          <div className={btnIdxNoBorder.cn3}>
            <BetArea target={betState?.tie} />
          </div>
          <div className={btnIdxNoBorder.cr4}>
            <BetArea target={betState?.dealer} />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-9 m-auto w-full">{userInfo}</div>
      </div>
      <div className="grid grid-rows-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:font-normal">
        <div className="grid grid-cols-11">
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'playerDragon',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.tl2)}
          >
            <div className="text-grid-400">
              <FormattedMessage id="common.playerDragon" />
            </div>
          </button>
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'playerPair',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.tn2)}
          >
            <div className="flex justify-around items-center px-5 w-full text-grid-400">
              <div>
                <p>1:11</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.playerPair" />
              </div>
            </div>
          </button>
          <button
            disabled={isNoFee ? isDisabled : true}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'super6',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(
              isDisabled ? 'bg-theme-50/50' : '',
              isNoFee
                ? 'text-grid-200'
                : 'text-orange-400/50 bg-theme-50/80 hover:bg-theme-50/80 hover:cursor-not-allowed',
              btnIdx.tn3 
            )}
          >
            <div className="flex justify-evenly items-center m-auto w-2/3">
              <div className="font-medium">SUPER 6</div>
              <p>1:20</p>
            </div>
          </button>
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'dealerPair',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.tn2)}
          >
            <div className="flex justify-around items-center px-5 w-full text-grid-100">
              <div>
                <FormattedMessage id="screens.baccaratRoom.dealerPair" />
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
                target: 'dealerDragon',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.tr2)}
          >
            <div className="text-grid-100">
              <FormattedMessage id="common.dealerDragon" />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-11">
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'player',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.cl4)}
          >
            <div className="flex justify-evenly items-center m-auto w-2/3 text-grid-400">
              <div>
                <p>1:1</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'tie',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.cn3)}
          >
            <div className="flex justify-around m-auto w-1/3 text-grid-300">
              <FormattedMessage id="common.simpleTie" />
              <div>
                <p>1:8</p>
              </div>
            </div>
          </button>
          <button
            disabled={isDisabled}
            onClick={() =>
              dispatchBet({
                type: 'addChips',
                target: 'dealer',
                amount: chipsData?.[selectedChip]?.value
              })
            }
            className={cx(isDisabled ? 'bg-theme-50/50' : '', btnIdx.cr4)}
          >
            <div className="flex justify-evenly items-center m-auto w-2/3 text-grid-100">
              <div>
                <FormattedMessage id="common.dealer" />
              </div>
              <div>{isNoFee ? <p>1:1</p> : <p>1:0.95</p>}</div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-7">{multipleGrid}</div>
      </div>
    </>
  )
}
