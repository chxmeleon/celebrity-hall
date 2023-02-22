import { RoomProps } from '@/types/room'
import { useQuery } from '@apollo/client'
import {
  GET_BACCARATROOMS,
  GET_CURRENT_BACCARAT_ROOM
} from '@/gql/baccaratrooms'
import StreamLatencyContext from '@/contexts/StreamLatencyContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'
import RoomDataContext from '@/contexts/RoomDataContext'

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

export const useGetRoomData = (type: string) => {
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const { data, refetch } = useQuery<types.GET_BACCARATROOMS>(
    GET_BACCARATROOMS,
    { variables: { type } }
  )

  useEffect(() => {
    if (data?.activeBaccaratRooms) {
      setRooms(data?.activeBaccaratRooms)
    }
  }, [data])

  const allData = useMemo(
    () => ({
      rooms,
      refetch
    }),
    [rooms, refetch]
  )

  return allData
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

  const [gameState, setGameState] = useState<any | null>(null)
  const [targets, setTargets] = useState<any | null>(null)

  useEffect(() => {
    refetch()
    setGameState(convertStatus(currentGame?.status))
    setTargets(currentGame?.targets)
  }, [refetch, currentGame])

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId },
      {
        received: (data) => {
          if (data) {
            setGameState(data?.command)
            if (data?.command === 'UPDATE_AMOUNT') {
              setTargets(data?.data?.targets)
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
    () => ({ currentGame, gameState, targets }),
    [currentGame, gameState, targets]
  )

  return { currentGameState }
}

export const useTimeLeft = (roomId: string) => {
  const { rooms, refetch } = useContext(RoomDataContext)

  const room = useMemo(
    () => (roomId ? rooms.find((room) => room.id === roomId) : undefined),
    [roomId, rooms]
  )

  const currentGame = useMemo(
    () => ({
      status: convertStatus(room?.currentGame?.status),
      endAt: room?.currentGame?.endAt
    }),
    [room]
  )

  const [gameState, setGameState] = useState<{
    status: string | undefined | null
    endAt: any
  } | null>(null)

  useEffect(() => {
    refetch?.()
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
    if (room && isCountDownStarted && counter <= 0) {
      const { latency } = room 
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
  }, [room, streamLatency, gameState, counter])

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
