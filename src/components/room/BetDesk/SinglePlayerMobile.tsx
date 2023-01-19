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
            <div className="-mb-5 w-6 h-auto" key={idx}>
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
    <div className="grid grid-rows-2 gap-2 w-full h-3/5 px-1 [&_button]:relative">
      <div className="grid grid-cols-5">
        <button disabled className="m-1 rounded-md bg-theme-75 brightness-50">
          <div className="px-3 w-full text-grid-400 [&_p]:text-gray-300">
            <div>
              <FormattedMessage id="common.playerDragon" />
            </div>
            <div>
              <p>1:30</p>
            </div>
          </div>
        </button>
        <button className="m-1 rounded-md bg-theme-75">
          <div className="text-xl px-3 w-full text-grid-400 [&_p]:text-gray-300">
            <FormattedMessage id="screens.baccaratRoom.playerPair" />
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>
        <button className="m-1 rounded-md bg-theme-75">
          <div className="px-1 m-auto w-full text-grid-200">
            <div className="font-bold">SUPER 6</div>
            <p className="text-gray-300">1:20</p>
          </div>
        </button>
        <button className="m-1 rounded-md bg-theme-75">
          <div className="text-xl px-3 w-full text-grid-100 [&_p]:text-gray-300 ">
            <div>
              <FormattedMessage id="screens.baccaratRoom.dealerPair" />
            </div>
            <div>
              <p>1:11</p>
            </div>
          </div>
        </button>
        <button disabled className="m-1 rounded-md bg-theme-75 brightness-50">
          <div className="px-3 w-full text-grid-100 [&_p]:text-gray-300 ">
            <div className="">
              <FormattedMessage id="common.dealerDragon" />
            </div>
            <div>
              <p>1:30</p>
            </div>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="m-0.5 rounded-md bg-theme-75">
          <div className="m-auto w-2/3 text-grid-400 [&_p]:text-gray-300">
            <div className="text-4xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.player" />
            </div>
            <div>
              <p>1:1</p>
            </div>
          </div>
        </button>
        <button className="m-0.5 rounded-md bg-theme-75">
          <div className="m-auto w-2/3 text-grid-300 [&_p]:text-gray-300">
            <div className="text-4xl font-bold">
              <FormattedMessage id="common.simpleTie" />
            </div>
            <div>
              <p>1:8</p>
            </div>
          </div>
        </button>
        <button className="m-0.5 rounded-md bg-theme-75">
          <div className="m-auto w-2/3 text-grid-100 [&_p]:text-gray-300">
            <div className="text-4xl font-bold">
              <FormattedMessage id="screens.baccaratRoom.dealer" />
            </div>
            <div>{isRegular ? <p>1:1</p> : <p>1:0.95</p>}</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SinglePlayerMobile
