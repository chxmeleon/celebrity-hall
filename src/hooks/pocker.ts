import { useQuery } from '@apollo/client'
import { GET_CURRENT_BACCARAT_ROOM } from '@/gql/baccaratrooms'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'
import { convertStatus } from './rooms'

export const pockerReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'DRAW':
      return {
        ...state,
        playerCards: action?.playload?.playerCards,
        playerPoints: action?.playload?.playerPoints,
        dealerCards: action?.playload?.dealerCards,
        dealerPoints: action?.playload?.dealerPoints
      }
    case 'PLAYER_DRAW_THIRD':
      return {
        ...state,
        playerCards: [
          ...(state?.playerCards || []),
          action?.playload?.playerCards[2]
        ],
        playerPoints: action?.playload?.playerPoints
      }

    case 'DEALER_DRAW_THIRD':
      return {
        ...state,
        dealerCards: [
          ...(state?.dealerCards || []),
          action?.playload?.dealerCards[2]
        ],
        dealerPoints: action?.playload?.dealerPoints
      }

    case 'CLOSE':
      return {
        ...state,
        result: action?.playload?.result
      }

    case 'RESET':
      return initialValue

    default:
      return state
  }
}

export const initialValue = {
  playerCards: [],
  playerPoints: 0,
  dealerCards: [],
  dealerPoints: 0,
  result: '',
  status: ''
}

export const usePockerUpdate = (roomId: string | undefined) => {
  const { cable } = useActionCable()
  const { data, refetch } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId ?? '' }
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const roads = data?.baccaratRoom?.roads
  const currentGame = useMemo(() => {
    return data?.baccaratRoom?.currentGame
  }, [data])

  const gqlData = {
    playerCards: currentGame?.playerCards,
    playerPoints: currentGame?.playerPoints,
    dealerCards: currentGame?.dealerCards,
    dealerPoints: currentGame?.dealerPoints,
    result: '',
    status: convertStatus(currentGame?.status)
  }

  const [gameState, setGameState] = useState<string | null | undefined>(
    gqlData.status
  )
  const [pockerState, dispatch] = useReducer(pockerReducer, gqlData)

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId },
      {
        received: (data) => {
          if (data) {
            setGameState(data?.command)
            switch (data?.command) {
              case 'DRAW':
                return dispatch({
                  type: 'DRAW',
                  playload: {
                    playerCards: data?.data?.playerCards,
                    playerPoints: data?.data?.playerPoints,
                    dealerCards: data?.data?.dealerCards,
                    dealerPoints: data?.data?.dealerPoints
                  }
                })
              case 'PLAYER_DRAW_THIRD':
                return dispatch({
                  type: 'PLAYER_DRAW_THIRD',
                  playload: {
                    playerCards: data?.data?.playerCards,
                    playerPoints: data?.data?.playerPoints
                  }
                })
              case 'DEALER_DRAW_THIRD':
                return dispatch({
                  type: 'DEALER_DRAW_THIRD',
                  playload: {
                    dealerCards: data?.data?.dealerCards,
                    dealerPoints: data?.data?.dealerPoints
                  }
                })
              case 'CLOSE':
                return dispatch({
                  type: 'CLOSE',
                  playload: { result: data?.data }
                })
              case 'STOP_BET':
                return dispatch({ type: 'RESET' })
            }
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId])

  const currentGameState = useMemo(
    () => ({
      data,
      gameState,
      roads,
      pockerState
    }),
    [data, gameState, roads, pockerState]
  )

  return { currentGameState }
}
