import { btnIdx } from './deskStyle'
import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'
import { useContext, useReducer } from 'react'
import { chipsData } from './chips'
import GamePlayContext from '@/contexts/GamePlayContext'

const BetArea: React.FC<{ target: string[] }> = ({ target }) => {
  return (
    <div className="overflow-hidden absolute bottom-0 px-2 w-full h-full">
      <div className="absolute flex flex-col flex-wrap-reverse">
        {target?.map((item: string, idx: number) => {
          return (
            <div className="-mb-3 w-5 h-auto" key={idx}>
              <img src={item} alt="chip image" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const SinglePlayer = () => {
  const { isRegular } = useSetup()

  const { selectedChip, betState, dispatchBet } = useContext(GamePlayContext)
  console.log(betState)

  return (
    <div className="cursor-pointer grid grid-cols-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:text-lg [&_p]:font-light">
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-9">
          <button disabled className={btnIdx.tl5}>
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:5</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.playerAny" />
              </div>
            </div>
          </button>
          <button className={btnIdx.tn4}>
            <div className="text-lg flex justify-between items-center px-3 w-full text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:11</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.playerPair" />
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
          <button className={btnIdx.cl5}>
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <p>1:0.54</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.big" />
              </div>
            </div>
          </button>
          <button disabled className={btnIdx.cn4}>
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
            <button disabled className={btnIdx.hbhln}>
              <div className="text-xs flex justify-between items-center px-2 text-grid-400 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <p>1:0.96</p>
                </div>
                <div>
                  <FormattedMessage id="screens.baccaratRoom.playerSingle" />
                </div>
              </div>
            </button>
            <button disabled className={btnIdx.hbhn}>
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
          <button disabled className={btnIdx.bn4}>
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
          onClick={() =>
            dispatchBet({
              type: 'addChips',
              playload: {
                playerChips: chipsData?.[selectedChip]?.src,
                playerAmount: chipsData?.[selectedChip]?.value
              }
            })
          }
          className={btnIdx.ynn}
        >
          <BetArea target={betState?.playerChips} />
          <div className="m-auto w-2/3 text-grid-400">
            <div className="text-4xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.player" />
            </div>
            <div>
              <p>1:1</p>
            </div>
          </div>
        </button>
        <div className="flex flex-col h-full">
          <button className={btnIdx.thhn}>
            <div className="flex justify-between items-center m-auto w-2/3 text-grid-300">
              <div className="text-4xl font-bold">
                <FormattedMessage id="common.simpleTie" />
              </div>
              <div>
                <p>1:8</p>
              </div>
            </div>
          </button>
          <button className={btnIdx.bhhn}>
            <div className="m-auto w-2/3 text-grid-200">
              <div className="font-bold">SUPER 6</div>
              <p>1:20</p>
            </div>
          </button>
        </div>
        <button className={btnIdx.ynn}>
          <div className="m-auto w-2/3 text-grid-100">
            <div className="text-4xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.dealer" />
            </div>
            <div>{isRegular ? <p>1:1</p> : <p>1:0.95</p>}</div>
          </div>
        </button>
      </div>
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-9">
          <button className={btnIdx.tn4}>
            <div className="text-lg flex justify-between items-center px-3 w-full text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <FormattedMessage id="screens.baccaratRoom.dealerPair" />
              </div>
              <div>
                <p>1:11</p>
              </div>
            </div>
          </button>
          <button className={btnIdx.tr5}>
            <div className="text-lg flex justify-between items-center px-3 w-full [&_p]:text-gray-300 [&_p]:text-xs">
              <div>
                <FormattedMessage id="screens.baccaratRoom.dealerAny" />
              </div>
              <div>
                <p>1:5</p>
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-9">
          <button className={btnIdx.cn4}>
            <div className="flex justify-between items-center px-3 w-full text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
              <div className="text-lg">
                <FormattedMessage id="common.dealerDragon" />
              </div>
              <div>
                <p>1:30</p>
              </div>
            </div>
          </button>
          <button className={btnIdx.cr5}>
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
          <button className={btnIdx.bn4}>
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
            <button className={btnIdx.hbhn}>
              <div className="text-xs flex justify-between items-center px-2 text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <FormattedMessage id="screens.baccaratRoom.playerDouble" />
                </div>
                <div>
                  <p>1:0.94</p>
                </div>
              </div>
            </button>
            <button className={btnIdx.hbhrn}>
              <div className="text-xs flex justify-between items-center px-2 text-grid-100 [&_p]:text-gray-300 [&_p]:text-xs">
                <div>
                  <FormattedMessage id="screens.baccaratRoom.playerSingle" />
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
