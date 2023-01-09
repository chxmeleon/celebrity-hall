import { gql } from '@apollo/client'

export const GET_STREAMERS = gql`
  query Streamers {
    streamers(withDisabled: true) {
      avatar
      id
      likesCount
      nickname
      online
      username
      winRate      
      stream {
        id
        key
        name
      }
    }
  }
`

export const GET_STREAMER = gql`
  query Streamer($id: ID!) {
    streamer(id: $id) {
      avatar
      id
      likesCount
      nickname
      online
      username
      winRate      
      stream {
        id
        key
        name
      }
    }
  }
`
