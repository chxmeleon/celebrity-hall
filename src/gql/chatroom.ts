import { gql } from '@apollo/client'

export const CREATE_BACCARAT_MESSAGE = gql`
  mutation CREATE_BACCARAT_MESSAGE($input: CreateBaccaratMessageInput!) {
    createBaccaratMessage(input: $input) {
      baccaratMessage {
        id
        type 
        body 
        createdAt 
        gift 
        user {
          id 
          username
          avatar 
        }
      }
      errors {
        message
        attribute
      }
    }
  }
`
