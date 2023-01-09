import { gql } from '@apollo/client'

export const GET_STREAMERRANKING = gql`
  query getStreamerRanking($range: String!) {
    newStreamerRanking(range: $range) {
      id
      nickname
      likesCount
      avatar
    }
  }
`

export const GET_USERRANKING = gql`
  query getUserRanking($type: String!, $range: String!) {
    userRanking(type: $type, range: $range)
  }
`
