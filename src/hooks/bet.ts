export type BetInitialValueProp = {
  [key: string]: number
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
  playerNatural: 0,
  dealerNatural: 0,
  playerAny: 0,
  dealerAny: 0
}

export const chipReducer = (state: BetInitialValueProp, action: any) => {
  switch (action.type) {
    case 'addChips':
      return {
        ...state,
        [action?.target]: state[action?.target] + action?.amount
      }

    case 'repeat':
      return action.preState

    case 'newRound':
      return betInitialValue

    default:
      return state
  }
}
