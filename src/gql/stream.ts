import { gql } from '@apollo/client'

export const GET_ROOM_STREAM = gql`
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
