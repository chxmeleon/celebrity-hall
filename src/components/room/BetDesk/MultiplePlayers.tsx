import { btnIdx, btnIdxNoBorder } from './deskStyle'
import { chipsData } from './chips'
import { clsx as cx } from 'clsx'
import { useContext, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import GamePlayContext from '@/contexts/GamePlayContext'
import { numberFormmat } from '@/hooks/bet'
import _ from 'lodash'
import { useWallet } from '@/hooks/profile'

const BetArea: React.FC<{ target: number }> = ({ target }) => {
  return (
    <div
      className={cx(
        'flex items-center justify-center w-full h-full pointer-events-none '
      )}
    >
      {target > 0 ? (
        <div className={cx('relative flex w-8 h-8 text-[10px] chip-skew')}>
          <div
            className={cx(
              'w-8 h-8 absolute top-0 left-0 flex justify-center items-center'
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

const targets = [
  ['playerDragon', 'playerPair', 'super6', 'dealerPair', 'dealerDragon'],
  ['player', 'tie', 'dealer']
]

const targetsMapper = {
  playerDragon: {
    betDiv: btnIdxNoBorder.tl2,
    betBtn: btnIdx.tl2,
    text: '1:30',
    textStyle: 'text-grid-400',
    id: 'common.playerDragon'
  },
  playerPair: {
    betDiv: btnIdxNoBorder.tn2,
    betBtn: btnIdx.tn2,
    text: '1:1',
    textStyle: 'text-grid-400',
    id: 'common.playerPair'
  },
  super6: {
    betDiv: btnIdxNoBorder.tn3,
    betBtn: btnIdx.tn3,
    text: '1:20',
    textStyle: 'text-grid-200',
    id: 'common.super6'
  },
  dealerPair: {
    betDiv: btnIdxNoBorder.tn2,
    betBtn: btnIdx.tn2,
    text: '1:1',
    textStyle: 'text-grid-100',
    id: 'common.dealerPair'
  },
  dealerDragon: {
    betDiv: btnIdxNoBorder.tr2,
    betBtn: btnIdx.tr2,
    text: '1:30',
    textStyle: 'text-grid-100',
    id: 'common.dealerDragon'
  },
  player: {
    betDiv: btnIdxNoBorder.cl4,
    betBtn: btnIdx.cl4,
    text: '1:1',
    textStyle: 'text-grid-400',
    id: 'common.simplePlayer'
  },
  tie: {
    betDiv: btnIdxNoBorder.cn3,
    betBtn: btnIdx.cn3,
    text: '1:8',
    textStyle: 'text-grid-300',
    id: 'common.simpleTie'
  },
  dealer: {
    betDiv: btnIdxNoBorder.cr4,
    betBtn: btnIdx.cr4,
    text: '1:1',
    textStyle: 'text-grid-100',
    id: 'common.simpleDealer'
  }
}

export const MultiplePlayers: React.FC<{
  isDisabled: boolean
  targetsData: { [key: string]: { [key: string]: string }[] } | undefined
  selectedChip: { [key: string]: string }
}> = ({ isDisabled, targetsData, selectedChip }) => {
  const { totalAmount, betState, dispatchBet, isNoFee } =
    useContext(GamePlayContext)
  const { user } = useWallet()
  const { profile } = user

  const flatArr = useMemo(
    () =>
      targetsData &&
      Object.values(targetsData)
        ?.flat()
        ?.map((item) => ({ player: item.player, amount: Number(item.amount) }))
        ?.filter(
          (value) =>
            value.player !== profile.nickname &&
            value.player !== profile.username
        ),
    [profile, targetsData]
  )

  const otherPlayers = useMemo(() => {
    return _(flatArr)
      ?.groupBy('player')
      ?.map((obj, key) => ({
        username: key,
        total: _.sumBy(obj, 'amount')
      }))
      ?.value()
  }, [flatArr])

  const userData = [
    { username: profile?.nickname ?? profile?.username, total: totalAmount },
    ...otherPlayers
  ]

  const userInfo = userData?.map((item, idx) => {
    return (
      <div
        key={`${item}-${idx}`}
        className="flex relative items-center p-1 w-full h-14"
      >
        <p className="absolute top-0 right-0 text-xs text-gray-500">{idx}</p>
        <div className="flex flex-shrink-0 rounded-full bg-theme-50">
          <div className="m-auto w-7 h-7 text-white i-heroicons-user-circle-solid"></div>
        </div>
        <div className="pl-3 w-full text-xs">
          <p className="w-4/5 truncate">{item.username}</p>
          <p className="text-amber-300">{item.total}</p>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className="grid absolute bottom-1 z-20 grid-rows-3 m-auto w-full h-full pointer-events-none">
        <div className="grid grid-cols-11 gap-4 px-[141px]">
          {targets[0].map((target, idx) => (
            <div
              key={`${target}-${idx}`}
              className={targetsMapper?.[target]?.betDiv}
            >
              <div className="inline-flex">
                <p className="text-gray-500">0</p>
                <BetArea target={betState?.[target]} />
              </div>
              {targetsData?.[target]
                .filter(
                  (value) =>
                    value.player !== profile.nickname &&
                    value.player !== profile.username
                )
                .slice(0, 8)
                .map((item, idx) => (
                  <div key={idx} className="inline-flex">
                    <BetArea target={Number(item.amount)} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-11 gap-4 px-28">
          {targets[1].map((target, idx) => (
            <div
              key={`${target}-${idx}`}
              className={targetsMapper?.[target]?.betDiv}
            >
              <div className="inline-flex items-start">
                <p className="text-gray-500 text-[14px]">0</p>
                <BetArea target={betState?.[target]} />
              </div>
              {targetsData?.[target]
                .filter(
                  (value) =>
                    value.player !== profile.nickname &&
                    value.player !== profile.username
                )
                .slice(0, 8)
                .map((item, idx) => (
                  <div key={`bet-${idx}`} className="inline-flex items-start">
                    <BetArea target={Number(item.amount)} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-5 w-full px-[76px]">
          {userInfo}
        </div>
      </div>
      <div className="grid grid-rows-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:font-normal">
        <div className="grid grid-cols-11">
          {targets[0].map((target, idx) => (
            <button
              disabled={idx === 2 ? (isNoFee ? isDisabled : true) : isDisabled}
              key={`btn-${target}-${idx}`}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target,
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75' : '',
                targetsMapper[target].textStyle,
                targetsMapper[target]?.betBtn,
                idx === 2 ? (isNoFee && !isDisabled ? '' : 'brightness-75') : ''
              )}
            >
              <div className="flex justify-around items-center px-5 w-full">
                {idx > 1 ? (
                  <>
                    <FormattedMessage id={targetsMapper[target]?.id} />
                    <p>{targetsMapper[target]?.text}</p>
                  </>
                ) : (
                  <>
                    <p>{targetsMapper[target]?.text}</p>
                    <FormattedMessage id={targetsMapper[target]?.id} />
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-11">
          {targets[1].map((target, idx) => (
            <button
              disabled={isDisabled}
              key={`btn-${target}-${idx}`}
              onClick={() =>
                dispatchBet({
                  type: 'addChips',
                  target,
                  amount: chipsData?.[selectedChip.chips]?.value
                })
              }
              className={cx(
                isDisabled ? 'brightness-75 hover:bg-theme-50/80' : '',
                targetsMapper[target].textStyle,
                targetsMapper[target]?.betBtn
              )}
            >
              <div className="flex justify-evenly items-center m-auto w-2/3">
                <div>
                  <FormattedMessage id={targetsMapper[target]?.id} />
                </div>
                {idx === 2 ? (
                  <div>{isNoFee ? <p>1:1</p> : <p>1:0.95</p>}</div>
                ) : (
                  <p>{targetsMapper[target]?.text}</p>
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-8">
          {[...new Array(8)].map((_val, idx) => (
            <>
              {idx === 0 ? (
                <div className={btnIdx.bln} />
              ) : idx === 7 ? (
                <div className={btnIdx.brn} />
              ) : (
                <div className={btnIdx.bnn} />
              )}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
