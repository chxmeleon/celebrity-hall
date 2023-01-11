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

export const GET_CURRENT_BACCARAT_ROOM = gql`
  query BaccaratRoom($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      roads
      streamKey
      streamName
      status
      streams {
        createdAt
        id
        key
        name
        updatedAt
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
    }
  }
`

export const GET_CURRENT_ROOM_STREAM = gql`
  query BaccaratRoom($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      name
      waitingBetSeconds
      streamName
      streamKey
      streams {
        createdAt
        id
        key
        name
        updatedAt
      }
      webhookUrl
      zoomType
      id
    }
  }
`

export const GET_CURRENT_COUNTDOWN = gql`
  query BaccaratRoom($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      id
      waitingBetSeconds
      currentGame {
        id
        status
        updatedAt
        endAt
      }
    }
  }
`


