import { CREATE_BACCARAT_BET } from '@/gql/baccaratrooms'
import { useMutation } from '@apollo/client'
import types from '@/types'
import { useParams } from 'react-router-dom'

const useBet = () => {
  const roomId = useParams()
  const [createBaccaratBet] = useMutation<
    types.CREATE_BACCARAT_BET,
    types.CREATE_BACCARAT_BETVariables
  >(CREATE_BACCARAT_BET)
  createBaccaratBet({
    variables: {
      input: {
        baccaratRoomId: roomId.id ?? '',
        playerAmount: 0,
        dealerAmount: 0,
        tieAmount: 0,
        playerPairAmount: 0,
        dealerPairAmount: 0,
        deviceInfo: ''
      }
    }
  })
}
