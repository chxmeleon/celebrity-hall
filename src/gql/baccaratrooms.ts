import { gql } from '@apollo/client'

export const GIRL_TYPE = gql`
  fragment GIRL_TYPE on Girl {
    id
    name
    avatar
  }
`

export const GET_BACCARATROOMS = gql`
  query GET_BACCARATROOMS {
    activeBaccaratRooms {
      id
      name
      girl {
        ...GIRL_TYPE
      }
      currentRoadsImage
      waitingBetSeconds
      roads
      alertText
      waitingText
      zoomType
      status
      streamName
      streamKey
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
        super6Amount
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
  ${GIRL_TYPE}
`

export const GET_CURRENT_BACCARAT_ROOM = gql`
  query GET_CURRENT_BACCARAT_ROOM($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      roads
      streamKey
      streamName
      status
      girl {
        id
        name
        avatar
      }
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

export const GET_CURRENT_ROOM_STREAM = gql`
  query GET_CURRENT_ROOM_STREAM($baccaratRoomId: ID!) {
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
  query GET_CURRENT_COUNTDOWN($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      id
      latency
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

export const CREATE_BACCARAT_BET = gql`
  mutation CREATE_BACCARAT_BET($input: CreateBaccaratBetInput!) {
    createBaccaratBet(input: $input) {
      errors {
        attribute
        message
      }
      wallet {
        id
        balance
      }
    }
  }
`

export const CANCEL_BACCARAT_BET = gql`
  mutation CANCEL_BACCARAT_BET($input: CancelBaccaratBetInput!) {
    cancelBaccaratBet(input: $input) {
      errors {
        attribute
        message
      }
      wallet {
        id
        balance
        creditBalance
        totalEffectiveAmount
        totalEffectiveXimaAmount
      }
    }
  }
`
