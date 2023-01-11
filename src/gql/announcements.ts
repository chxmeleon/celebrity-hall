import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
  query GET_ANNOUNCEMENTS {
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
  query GET_STREAMERS {
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
