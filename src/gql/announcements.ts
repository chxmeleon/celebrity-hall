import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
  query Annoncements {
    annoncements {
      records {
        id
        content
        createdAt
        updatedAt
        targetType
      }
    }
  }
`

export const GET_STREAMERS = gql`
  query Annoncements {
    streamers(withDisabled: true) {
      avatar
      id
      likesCount
      nickname
      online
      username
      winRate
    }
  }
`
