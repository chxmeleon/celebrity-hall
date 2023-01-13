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

type GameContextData = {
  gameState: string | null 
}

const GameStateContext = createContext<GameContextData>({} as GameContextData)
export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const roomId = useParams()
  const { data } = useQuery<
    types.GET_CURRENT_BACCARAT_ROOM,
    types.GET_CURRENT_BACCARAT_ROOMVariables
  >(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: roomId?.id ?? '' }
  })

  const [gameState, setGameState] = useState<string | null>(null)
  const { cable } = useActionCable()
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'LatencyChannel', uuid: uuidV4() },
      {
        received: (data) => {
          console.log(data)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable])

  const value = { gameState }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
