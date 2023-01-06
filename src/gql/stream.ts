import { gql } from '@apollo/client'

export const GET_ROOM_STREAM = gql`
  query ActiveBaccaratRooms {
    activeBaccaratRooms {
      webhookUrl
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
