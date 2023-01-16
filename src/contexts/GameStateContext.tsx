import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_BACCARAT_ROOM } from '@/gql/baccaratrooms'
import { v4 as uuidV4 } from 'uuid'
import { useActionCable } from './ActionCableContext'
import types from '@/types'
import { convertStatus } from '@/hooks/rooms'

type GameContextData = {
  gameState: string
  isShowPocker: boolean
}

const GameStateContext = createContext<GameContextData>({} as GameContextData)
export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { cable } = useActionCable()
  const roomId = useParams()
  const { data } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId?.id ?? '' }
  })
  const currentGame = data?.baccaratRoom?.currentGame
  const gameStatus = convertStatus(currentGame?.status)
  const [gameState, setGameState] = useState<any | null>(gameStatus)

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'NewBaccaratGameChannel', roomId: roomId.id },
      {
        received: (data: any) => {
          setGameState(data.command)
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
      gameState !== 'CLOSE' &&
      gameState !== 'UPDATE_AMOUNT' &&
      gameState !== 'SHUFFLE'
    ) {
      setIsShowPocker(true)
    } else {
      setIsShowPocker(false)
    }
  }, [gameState])


  const [dealerCard, setDealerCard] = useState<Array<number>>([])




  const value = { gameState, isShowPocker }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
