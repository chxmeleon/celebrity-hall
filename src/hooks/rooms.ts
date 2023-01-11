import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_BACCARAT_ROOM } from '@/gql/baccaratrooms'
import { useMemo } from 'react'

export const useCurrentGame = () => {
  const roomId = useParams()
  const { data } = useQuery(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: Number(roomId?.id) }
  })

  const currentGame = useMemo(() => {
    return data
  }, [data])

  return { currentGame }
}

export const useCurrentGameState = () => {
  const roomId = useParams()
  const { data } = useQuery(GET_CURRENT_BACCARAT_ROOM, {
    variables: { baccaratRoomId: Number(roomId?.id) }
  })

  const currentGameState = useMemo(
    () => data?.baccaratRoom?.currentGame,
    [data]
  )

  return { currentGameState }
}
