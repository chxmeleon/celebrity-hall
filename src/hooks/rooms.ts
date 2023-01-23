import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  GET_CURRENT_BACCARAT_ROOM,
  GET_CURRENT_COUNTDOWN
} from '@/gql/baccaratrooms'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'
import { useAnimationFrame } from 'framer-motion'

export const convertStatus = (status: string | null | undefined) => {
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

export const useCurrentGame = (roomId: string | undefined) => {
  const { data, refetch } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId ?? '' }
  })

  useEffect(() => {
    refetch()
  })

  const currentGame = useMemo(() => {
    return data
  }, [data])

  return { currentGame }
}

export const useCurrentGameState = (roomId: string | undefined) => {
  const { cable } = useActionCable()
  const { data, refetch } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId ?? '' }
  })

  const currentGame = useMemo(() => {
    return data?.baccaratRoom?.currentGame
  }, [data])

  const gameStatus = convertStatus(currentGame?.status)
  const [gameState, setGameState] = useState<any | null>(null)

  useEffect(() => {
    refetch()
    setGameState(gameStatus)
  }, [gameStatus, refetch])

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId },
      {
        received: (data) => {
          if (data) {
            setGameState(data?.command)
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])

  const [isShowPocker, setIsShowPocker] = useState(false)
  useEffect(() => {
    if (
      gameState !== 'START_BET' &&
      gameState !== 'STOP_BET' &&
      gameState !== 'UPDATE_AMOUNT' &&
      gameState !== 'SHUFFLE'
    ) {
      setIsShowPocker(true)
    } else {
      setIsShowPocker(false)
    }
  }, [gameState])

  const currentGameState = useMemo(
    () => ({ currentGame, gameState, isShowPocker }),
    [currentGame, gameState, isShowPocker]
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

  const currentGame = useMemo(
    () => ({
      status: convertStatus(data?.baccaratRoom?.currentGame?.status),
      endAt: data?.baccaratRoom?.currentGame?.endAt
    }),
    [data]
  )

  const [gameState, setGameState] = useState<{
    status: string | undefined | null
    endAt: any
  } | null>(null)

  useEffect(() => {
    refetch()
    setGameState(currentGame)
  }, [currentGame, refetch])

  const { cable } = useActionCable()

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId },
      {
        received: (data) => {
          if (data?.command !== undefined) {
            setGameState({ status: data?.command, endAt: data?.data?.endAt })
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, roomId, gameState])

  const [counter, setCounter] = useState<number>(0)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const startCount =
    gameState?.status === 'START_BET' || gameState?.status === 'UPDATE_AMOUNT'

  const isOpening = gameState?.status !== 'CLOSE'
  const isClose = gameState?.status === 'CLOSE'
  const isLeftTen = counter !== undefined && counter < 11
  const streamLatency = useContext(StreamLatencyContext)

  useEffect(() => {
    const isCountDownStarted = gameState?.status === 'START_BET'
    if (data?.baccaratRoom?.currentGame && isCountDownStarted && counter <= 0) {
      const { latency } = data.baccaratRoom
      const endAt = new Date(gameState?.endAt)

      const timeLeftRaw =
        (endAt.getTime() - Date.now()) / 1000 + (latency ?? 0) - streamLatency
      const timeLeftInt = Math.floor(timeLeftRaw)
      const timeLeftFraction = timeLeftRaw % 1

      setCounter(timeLeftInt)
      setTimeout(() => {
        setCounter(timeLeftInt - 1)
        setIsCountingDown(true)
      }, timeLeftFraction * 1000)
    }
  }, [data, streamLatency, gameState, counter])

  useEffect(() => {
    let timeout: number | null = null
    if (isCountingDown) {
      timeout = window.setInterval(() => {
        setCounter((counter) => {
          const newCounter = counter - 1
          if (newCounter < 0) setIsCountingDown(false)

          return newCounter
        })
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearInterval(timeout)
      }
    }
  }, [isCountingDown])

  return { counter, isLeftTen, startCount, isOpening, isClose }
}

export const useActivedTab = () => {
  const [isActivedTab, setIsActivedTab] = useState(false)
  useEffect(() => {
    document.addEventListener('visibilitychange', (event) => {
      if (document.visibilityState == 'visible') {
        setIsActivedTab(true)
        console.log('tab is active')
      } else {
        setIsActivedTab(false)
        console.log('tab is inactive')
      }
    })
  }, [])

  return { isActivedTab }
}
