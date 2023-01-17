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

export const SEND_GIFT = gql`
  mutation SEND_GIFT($input: SendGiftInput!) {
    sendGift(input: $input) {
      errors {
        attribute
        message
      }
    }
  }
`

export const SEND_BACCARAT_GIFT = gql`
  mutation SEND_BACCARAT_GIFT($input: SendBaccaratGiftInput!) {
    sendBaccaratGift(input: $input) {
      errors {
        message
        attribute
      }
    }
  }
`
