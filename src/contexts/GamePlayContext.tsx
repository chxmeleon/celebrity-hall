import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_BACCARAT_BET, CANCEL_BACCARAT_BET } from '@/gql/baccaratrooms'
import { GET_WALLET } from '@/gql/profile'
import types from '@/types'
import {
  chipReducer,
  initialChipAmount,
  BetInitialValueProp,
  ChipAction,
  bettingBtnReducer,
  bettingBtnInitalState,
  BettingBtnProp,
  BettingBtnAction
} from '@/hooks/bet'
import { useLocation } from 'react-router-dom'
import { useActionCable } from './ActionCableContext'
import {
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  deviceType
} from 'react-device-detect'

type GamePlayContextData = {
  selectedChip: string
  setSelectedChip: React.Dispatch<React.SetStateAction<string>>
  btnState: BettingBtnProp
  dispatchBtn: React.Dispatch<BettingBtnAction>
  betState: BetInitialValueProp
  dispatchBet: React.Dispatch<ChipAction>
  onConfirm: (e: React.MouseEvent, roomId: string) => Promise<void>
  onCancel: (roomId: string) => Promise<void>
  onRepeat: (roomId: string) => Promise<void>
  totalAmount: number
  notice: any
  isNoFee: boolean
  handleNoFeeToggle: () => void
}

const GamePlayContext = createContext<GamePlayContextData>(
  {} as GamePlayContextData
)
export const GamePlayProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [isNoFee, setIsNoFee] = useState<boolean>(false)
  const handleNoFeeToggle = () => setIsNoFee((isNoFee) => !isNoFee)

  const preLocation = useLocation().pathname
  const [location, setLocation] = useState(preLocation)
  const [selectedChip, setSelectedChip] = useState('chips_100')
  const [betState, dispatchBet] = useReducer(chipReducer, initialChipAmount)
  const [btnState, dispatchBtn] = useReducer(
    bettingBtnReducer,
    bettingBtnInitalState
  )

  useEffect(() => {
    if (preLocation !== location) {
      return dispatchBet({ type: 'newRound' })
    }
  }, [preLocation, location, dispatchBet])

  const deviceInfo = useMemo(
    () => ({
      osVersion,
      osName,
      fullBrowserVersion,
      browserName,
      mobileVendor,
      mobileModel,
      engineName,
      engineVersion,
      deviceType,
      userAgent: getUA
    }),
    []
  )

  const { data, refetch } = useQuery(GET_WALLET)
  const { cable } = useActionCable()
  const [notice, setNotice] = useState<any | null>(null)
  const wallet = useMemo(() => data?.wallet, [data])

  useEffect(() => {
    const walletSubscription = cable.subscriptions.create(
      { channel: 'WalletChannel' },
      {
        received: (data) => {
          if (data) {
            refetch()
          }
        }
      }
    )

    const subscription = cable.subscriptions.create(
      { channel: 'JackpotChannel' },
      {
        received: (data) => {
          if (data) {
            setNotice(data.jackpot)
          }
        }
      }
    )
    return () => {
      walletSubscription.unsubscribe()
      subscription.unsubscribe()
    }
  }, [cable, refetch])

  const [createBaccaratBet] = useMutation<
    types.CREATE_BACCARAT_BET,
    types.CREATE_BACCARAT_BETVariables
  >(CREATE_BACCARAT_BET)

  const [cancelBaccaratBet] = useMutation<
    types.CANCEL_BACCARAT_BET,
    types.CANCEL_BACCARAT_BETVariables
  >(CANCEL_BACCARAT_BET)

  const totalAmount: any = useMemo(
    () => Object.values(betState).reduce((a: any, b: any) => a + b),
    [betState]
  )

  const [preBetState, setPreBetState] =
    useState<BetInitialValueProp>(initialChipAmount)

  const onCancel = async (roomId: string) => {
    dispatchBet({ type: 'newRound' })
    if (totalAmount > 0 || btnState.isCancelDisabled) {
      const result = await cancelBaccaratBet({
        variables: {
          input: {
            baccaratRoomId: roomId ?? ''
          }
        }
      })
      if (result.errors?.length === 0) {
        dispatchBtn({ type: 'setTrue', btnTarget: 'isCancelSuccess' })
      }
    }
    dispatchBtn({ type: 'onCancel' })
  }

  const onConfirm = async (e: React.MouseEvent, roomId: string) => {
    if (totalAmount >= 0 && totalAmount <= wallet?.balance) {
      try {
        const result = await createBaccaratBet({
          variables: {
            input: {
              baccaratRoomId: roomId ?? '',
              playerAmount: betState?.player,
              dealerAmount: betState?.dealer,
              playerPairAmount: betState?.playerPair,
              dealerPairAmount: betState?.dealerPair,
              playerDragonAmount: betState?.playerDragon,
              dealerDragonAmount: betState?.dealerDragon,
              playerSingleAmount: betState?.playerSingle,
              dealerSingleAmount: betState?.dealerSingle,
              playerDoubleAmount: betState?.playerDouble,
              dealerDoubleAmount: betState?.dealerDouble,
              anyPairAmount: betState?.playerAny,
              perfectPairAmount: preBetState?.dealerAny,
              playerKingAmount: betState?.playerNatural,
              dealerKingAmount: betState?.dealerNatural,
              tieAmount: betState?.tie,
              super6Amount: betState?.super6,
              smallAmount: betState?.small,
              bigAmount: betState?.big,
              gameType: 'normal',
              deviceInfo: JSON.stringify(deviceInfo)
            }
          }
        })

        if (result?.data?.createBaccaratBet?.errors?.length === 0) {
          dispatchBtn({ type: 'setTrue', btnTarget: 'isConfirmSuccess' })
        } else {
          dispatchBtn({ type: 'setTrue', btnTarget: 'isConfirmFailure' })
        }
        dispatchBtn({ type: 'onConfirm' })
        setPreBetState(betState)
      } catch (err) {
        console.log(err)
      }
      setTimeout(() => {
        dispatchBtn({ type: 'setFalse', btnTarget: 'isConfirmSuccess' })
        dispatchBtn({ type: 'setFalse', btnTarget: 'isConfirmFailure' })
      }, 1500)
    } else {
      e.preventDefault()
    }
  }

  const onRepeat = async (roomId: string) => {
    dispatchBet({ type: 'repeat', preState: preBetState })
    try {
      const result = await createBaccaratBet({
        variables: {
          input: {
            baccaratRoomId: roomId ?? '',
            playerAmount: preBetState?.player,
            dealerAmount: preBetState?.dealer,
            playerPairAmount: preBetState?.playerPair,
            dealerPairAmount: preBetState?.dealerPair,
            playerDragonAmount: preBetState?.playerDragon,
            dealerDragonAmount: preBetState?.dealerDragon,
            playerSingleAmount: preBetState?.playerSingle,
            dealerSingleAmount: preBetState?.dealerSingle,
            playerDoubleAmount: preBetState?.playerDouble,
            dealerDoubleAmount: preBetState?.dealerDouble,
            anyPairAmount: preBetState?.playerAny,
            perfectPairAmount: preBetState?.dealerAny,
            playerKingAmount: preBetState?.playerNatural,
            dealerKingAmount: preBetState?.dealerNatural,
            tieAmount: preBetState?.tieAmount,
            super6Amount: preBetState?.super6Amount,
            smallAmount: preBetState?.smallAmount,
            bigAmount: preBetState?.bigAmount,
            gameType: 'normal',
            deviceInfo: JSON.stringify(deviceInfo)
          }
        }
      })
      if (result?.data?.createBaccaratBet?.errors?.length === 0) {
        dispatchBtn({ type: 'setTrue', btnTarget: 'isRepeatSuccess' })
      } else {
        dispatchBtn({ type: 'setTrue', btnTarget: 'isConfirmFailure' })
      }
      dispatchBtn({ type: 'onRepeat' })
    } catch (err) {
      console.log(err)
    }
    setTimeout(() => {
      dispatchBtn({ type: 'setFalse', btnTarget: 'isRepeatSuccess' })
      dispatchBtn({ type: 'setFalse', btnTarget: 'isConfirmFailure' })
    }, 1500)
  }

  const value = {
    selectedChip,
    setSelectedChip,
    btnState,
    dispatchBtn,
    betState,
    dispatchBet,
    onCancel,
    onConfirm,
    onRepeat,
    totalAmount,
    notice,
    isNoFee,
    handleNoFeeToggle
  }

  return (
    <GamePlayContext.Provider value={value}>
      {children}
    </GamePlayContext.Provider>
  )
}

export default GamePlayContext
