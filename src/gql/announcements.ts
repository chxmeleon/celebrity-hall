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
