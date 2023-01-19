import { gql } from '@apollo/client'

export const GET_ROOM_STREAM = gql`
  query GET_ROOM_STREAM($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      name
      waitingBetSeconds
      roads
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
