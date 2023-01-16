import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GET_PROFILE {
    profile {
      	id
	    balance
	    username 
	    avatar 
	    totalEffectiveAmount 
	    dividend 
	    nickname 
		creditBalance
    }
  }
`

// export const GET_USERCHARGERECORDS = gql`
//   query GET_USERCHARGERECORDS($userId: ID!, $page: Int, $perPage: Int) {
// 	userChargeRecords(userId: $userId, page: $page, perPage: $perPage) {
// 		currentPage
// 		records {
// 		  amount
// 		  createdAt
// 		  id
// 		  updatedAt
// 		}
// 		totalPages
// 	}
//   }
// `

export const GET_USERBETRECORDS = gql`
	query liveBaccaratBetRecords(
		$page: Int
		$perPage: Int
		$startDate: ISO8601DateTime!
		$endDate: ISO8601DateTime!
	) {
		liveBaccaratBetRecords(
		page: $page
		perPage: $perPage
		startDate: $startDate
		endDate: $endDate
		) {
		records {
			id
			betNo
			totalBet
			winLossAmount 
			createdAt 
			totalWinAmount 
		}
		totalPages
		currentPage
		}
	}
`

export const GET_SENDGIFTRECORDS = gql`
	query GET_SENDGIFTRECORDS(
		$page: Int 
		$perPage: Int 
		$startDate: ISO8601DateTime! 
		$endDate: ISO8601DateTime! 
	) {
		sendGiftRecords(
		page: $page
		perPage: $perPage
		startDate: $startDate
		endDate: $endDate
		) {
		records {
			id
			info 
			createdAt
		}
		totalCount 
		totalPages 
		currentCount 
		currentPage 
		}
	}
`