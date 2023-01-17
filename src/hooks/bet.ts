import { CREATE_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { useParams } from 'react-router-dom'

const useBetting = () => {
  const roomId = useParams()
  const [createBaccaratBet] = useMutation<
    types.CREATE_BACCARAT_BET,
    types.CREATE_BACCARAT_BETVariables
  >(CREATE_BACCARAT_BET)
  /* createBaccaratBet({ */
  /*   variables: { */
  /*     input: { */
  /*       baccaratRoomId: roomId.id ?? '', */
  /*       playerAmount: 0, */
  /*       dealerAmount: 0, */
  /*       tieAmount: 0, */
  /*       playerPairAmount: 0, */
  /*       dealerPairAmount: 0, */
  /*       deviceInfo: '' */
  /*     } */
  /*   } */
  /* }) */
}

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
  smallAmount: 0
}

export const chipReducer = (state: BetInitialValueProp, action: any) => {
  switch (action.type) {
    case 'addChips':
      return {
        ...state,
        playerChips: [
          ...(state?.playerChips || []),
          action?.playload?.playerChips
        ],
        playerAmount: state?.playerAmount + action?.playload?.playerAmount
      }
    case 'cancel':
      return betInitialValue

    case 'confirm':
      return state

    case 'repeat':
      return state

    default:
      return state
  }
}
