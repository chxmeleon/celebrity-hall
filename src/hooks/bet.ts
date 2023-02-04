export interface BetInitialValueProp {
  [key: string]: number
}

export type ChipAction =
  | { type: 'repeat'; preState: BetInitialValueProp }
  | { type: 'newRound' }
  | { type: 'addChips'; target: string; amount: number }

const targetsType = [
  'player',
  'playerPair',
  'dealer',
  'dealerPair',
  'tie',
  'big',
  'small',
  'super6',
  'playerDragon',
  'dealerDragon',
  'playerSingle',
  'dealerSingle',
  'playerDouble',
  'dealerDouble',
  'playerNatural',
  'dealerNatural',
  'playerAny',
  'dealerAny'
] as const

type TargetType = typeof targetsType[number]

export const initialChipAmount: Record<TargetType, number> = Object.values(
  targetsType
).reduce((acc, key) => {
  acc[key] = 0
  return acc
}, {} as Record<TargetType, number>)

export const chipReducer = (state: BetInitialValueProp, action: ChipAction) => {
  switch (action.type) {
    case 'repeat':
      return action.preState

    case 'newRound':
      return initialChipAmount

    default:
      return state

    case 'addChips':
      if (action?.target && action?.amount) {
        return {
          ...state,
          [action?.target]: state[action?.target] + action?.amount
        }
      }
  }
}

export interface BettingBtnProp {
  [key: string]: boolean
}

export type BettingBtnAction =
  | { type: 'setTrue' | 'setFalse'; btnTarget: string }
  | { type: 'onCancel' | 'onRepeat' | 'onConfirm' | 'disableBet' }
  | { type: 'enableBet'; totalAmount: number }

export const bettingBtnInitalState = {
  isDisable: true,
  isConfirmDisabled: false,
  isCancelDisabled: false,
  isRepeatDisabled: false,
  isCancelSuccess: false,
  isRepeatSuccess: false,
  isConfirmSuccess: false
}

export const bettingBtnReducer = (
  state: BettingBtnProp,
  action: BettingBtnAction
) => {
  switch (action.type) {
    case 'setTrue':
      return {
        ...state,
        [action?.btnTarget]: true
      }

    case 'setFalse':
      return {
        ...state,
        [action?.btnTarget]: false
      }

    case 'onCancel':
      return {
        ...state,
        isConfirmDisabled: false,
        isRepeatDisabled: false,
        isCancelDisabled: true
      }

    case 'onRepeat':
      return {
        ...state,
        isCancelDisabled: false,
        isRepeatDisabled: true,
        isConfirmDisabled: true
      }

    case 'onConfirm':
      return {
        ...state,
        isConfirmDisabled: true,
        isRepeatDisabled: true
      }

    case 'disableBet':
      return {
        ...state,
        isDisable: true,
        IsConfirmDisabled: true,
        IsRepeatDisabled: true,
        IsCancelDisabled: true
      }

    case 'enableBet':
      return {
        ...state,
        isDisable: false,
        isRepeatDisabled: false,
        isConfirmDisabled: false,
        isCancelDisabled: action.totalAmount > 0 ? false : true
      }

    default:
      return state
  }
}
