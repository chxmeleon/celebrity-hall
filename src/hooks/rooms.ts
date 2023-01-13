import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  GET_CURRENT_BACCARAT_ROOM,
  GET_CURRENT_COUNTDOWN,
} from '@/gql/baccaratrooms'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'

const convertStatus = (status: string) => {
  switch (status) {
    case 'waiting_for_bet':
      return 'START_BET'
    case 'opening':
      return 'DRAW'
    case 'opening_confirmed':
      return 'DRAW'
    case 'player_third_opening':
      return 'PLAYER_DRAW_THIRD'
    case 'dealer_third_opening':
      return 'DEALER_DRAW_THIRD'
    case 'dealer_third_opening_confirmed':
      return 'DEALER_DRAW_THIRD_CONFIRMED'
    case 'player_third_opening_confirmed':
      return 'PLAYER_DRAW_THIRD_CONFIRMED'
    case 'closed':
      return 'CLOSE'
    case 'maintain':
      return 'MAINTAIN'
    case 'maintain_recover':
      return 'MAINTAIN_RECOVER'
    case 'sos':
      return 'SOS'
    case 'sos_recover':
      return 'SOS_RECOVER'
  }
}

export const useCurrentGame = () => {
  const roomId = useParams()
  const { data } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId?.id ?? '' }
  })

  const currentGame = useMemo(() => {
    return data
  }, [data])

  return { currentGame }
}

export const useCurrentGameState = () => {
  const roomId = useParams()
  const { data } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId?.id ?? '' }
  })

  const currentGameState = useMemo(
    () => data?.baccaratRoom?.currentGame,
    [data]
  )

  return { currentGameState }
}

export const useTimeLeft = (roomId: string) => {
  const { data, refetch } = useQuery<
    types.GET_CURRENT_COUNTDOWN,
    types.GET_CURRENT_COUNTDOWNVariables
  >(GET_CURRENT_COUNTDOWN, {
    variables: { baccaratRoomId: roomId }
  })

  const [gameState, setGameState] = useState<any | null>(null)
  const { cable } = useActionCable()
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId },
      {
        received: (data: any) => {
          setGameState(data)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])


  const isOpening = gameState?.command !== 'CLOSE'
  const [counter, setCounter] = useState<number | undefined>()
  const startCount =
    data?.baccaratRoom?.currentGame?.status === 'waiting_for_bet' && gameState?.command === 'START_BET'  

  const isLeftTen = counter !== undefined && counter < 11

  const streamLatency = useContext(StreamLatencyContext)
  useEffect(() => {
    const isCountDownStarted = gameState?.command === 'START_BET'
    if (data?.baccaratRoom?.currentGame && isCountDownStarted) {
      const { latency } = data.baccaratRoom
      const endAt = new Date(gameState?.data?.endAt)
      const timeLeft = Math.floor(
        (endAt.getTime() - Date.now()) / 1000 + (latency ?? 0) - streamLatency - 7 
      )

      setCounter(timeLeft)
    }
  }, [counter, data, streamLatency, gameState])

  
  useEffect(() => {
    let timeout: number | null = null
    if (counter !== undefined && counter >= 0) {
      timeout = window.setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [counter])

  return { counter, isLeftTen, startCount, isOpening }
}
