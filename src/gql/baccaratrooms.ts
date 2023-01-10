import { gql } from '@apollo/client'

export const GET_BACCARATROOMS = gql`
  query getBaccaratRooms {
    activeBaccaratRooms {
      id
      name
      girl {
        id
        name
        avatar
      }
      currentRoadsImage
      waitingBetSeconds
      roads
      alertText
      waitingText
      zoomType
      status
      streams {
        id
        name
        key
      }
      currentGame {
        id
        baccaratRoomId
        playerWin
        dealerWin
        tieWin
        playerPairWin
        dealerPairWin
        dealerPoints
        playerPoints
        gameNo
        status
        playerCards
        dealerCards
        shuffle
        playerNeedAnother
        dealerNeedAnother
        dealerAmount
        playerAmount
        dealerPairAmount
        playerPairAmount
        tieAmount
        updatedAt
        endAt
      }
      currentBaccaratBetRecord {
        id
        playerAmount
        playerDiffAmount
        dealerAmount
        dealerDiffAmount
        tieAmount
        tieDiffAmount
        playerPairAmount
        playerPairDiffAmount
        dealerPairAmount
        dealerPairDiffAmount
        totalAmount
        totalDiffAmount
        hasResult
        winLossAmount
        gameNo
        roomName
      }
    }
  }
`