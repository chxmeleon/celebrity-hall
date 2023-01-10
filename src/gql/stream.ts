import { gql } from '@apollo/client'

export const GET_ROOM_STREAM = gql`
  query ActiveBaccaratRooms {
    activeBaccaratRooms {
      webhookUrl
      id
      currentGame {
        baccaratRoom {
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
        }
      }
    }
  }
`
