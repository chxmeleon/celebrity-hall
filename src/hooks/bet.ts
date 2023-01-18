import { CREATE_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { useParams } from 'react-router-dom'

export type BetInitialValueProp = {
  playerChips: string[]
  playerAmount: number
  playerPairChips: string[]
  playerPairAmount: number
  dealerChips: string[]
  dealerAmount: number
  dealerPairChips: string[]
  dealerPairAmount: number
  tieChips: string[]
  tieAmount: number
  bigChips: string[]
  bigAmount: number
  smallChips: string[]
  smallAmount: number
  super6Chips: string[]
  super6Amount: number
}

export const betInitialValue = {
  playerChips: [],
  playerAmount: 0,
  playerPairChips: [],
  playerPairAmount: 0,
  dealerChips: [],
  dealerAmount: 0,
  dealerPairChips: [],
  dealerPairAmount: 0,
  tieChips: [],
  tieAmount: 0,
  bigChips: [],
  bigAmount: 0,
  smallChips: [],
  smallAmount: 0,
  super6Chips: [],
  super6Amount: 0
}

export const chipReducer = (state: BetInitialValueProp, action: any) => {
  switch (action.type) {
    case 'addPlayerChips':
      return {
        ...state,
        playerChips: [
          ...(state?.playerChips || []),
          action?.playload?.playerChips
        ],
        playerAmount: state?.playerAmount + action?.playload?.playerAmount
      }
    case 'addDealerChips':
      return {
        ...state,
        dealerChips: [
          ...(state?.dealerChips || []),
          action?.playload?.dealerChips
        ],
        dealerAmount: state?.dealerAmount + action?.playload?.dealerAmount
      }

    case 'addPlayerPairChips':
      return {
        ...state,
        playerPairChips: [
          ...(state?.playerPairChips || []),
          action?.playload?.playerPairChips
        ],
        playerPairAmount:
          state?.playerPairAmount + action?.playload?.playerPairAmount
      }
    case 'addDealerPairChips':
      return {
        ...state,
        dealerPairChips: [
          ...(state?.dealerPairChips || []),
          action?.playload?.dealerPairChips
        ],
        dealerPairAmount:
          state?.dealerPairAmount + action?.playload?.dealerPairAmount
      }
    case 'addSmallChips':
      return {
        ...state,
        smallChips: [
          ...(state?.smallChips || []),
          action?.playload?.smallChips
        ],
        smallAmount: state?.smallAmount + action?.playload?.smallAmount
      }
    case 'addBigChips':
      return {
        ...state,
        bigChips: [...(state?.bigChips || []), action?.playload?.bigChips],
        bigAmount: state?.bigAmount + action?.playload?.bigAmount
      }
    case 'addTieChips':
      return {
        ...state,
        tieChips: [...(state?.tieChips || []), action?.playload?.tieChips],
        tieAmount: state?.tieAmount + action?.playload?.tieAmount
      }

    case 'addSuper6Chips':
      return {
        ...state,
        super6Chips: [
          ...(state?.super6Chips || []),
          action?.playload?.super6Chips
        ],
        super6Amount: state?.super6Amount + action?.playload?.super6Amount
      }

    case 'repeat':
      return state

    case 'newRound':
      return betInitialValue

    default:
      return state
  }
}
