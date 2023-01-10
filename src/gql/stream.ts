import { gql } from '@apollo/client'

export const GET_ROOM_STREAM = gql`
  query BaccaratRoom($baccaratRoomId: ID!) {
    baccaratRoom(id: $baccaratRoomId) {
      name
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
