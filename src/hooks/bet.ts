export interface BetInitialValueProp {
  [key: string]: number
}

export interface ChipAction {
  type: string
  target?: string
  amount?: number
  preState?: BetInitialValueProp
}

export const betInitialValue = {
  playerAmount: 0,
  playerPairAmount: 0,
  dealerAmount: 0,
  dealerPairAmount: 0,
  tieAmount: 0,
  bigAmount: 0,
  smallAmount: 0,
  super6Amount: 0,
  playerDragonAmount: 0,
  dealerDragonAmount: 0,
  playerSingleAmount: 0,
  dealerSingleAmount: 0,
  playerDoubleAmount: 0,
  dealerDoubleAmount: 0,
  playerNaturalAmount: 0,
  dealerNaturalAmount: 0,
  playerAnyAmount: 0,
  dealerAnyAmount: 0
}

export const chipReducer = (state: BetInitialValueProp, action: ChipAction) => {
  switch (action.type) {
    case 'repeat':
      return action.preState

    case 'newRound':
      return betInitialValue

    default:
      return state

    case 'addChips':
      if (action?.target && action?.amount) {
        return {
          ...state,
          [action?.target]: state[action?.target] + action?.amount
        }
      }
    break
  }
}
