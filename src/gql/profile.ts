import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GET_PROFILE {
    profile {
      id
	    balance
	    username 
	    avatar 
	    totalEffectiveAmount 
	    totalEffectiveXimaAmount 
	    ximaTotal 
	    winLimit 
	    totalWinAmount 
	    hideWinPoints 
	    dividend 
	    nickname 
	    tableLimitMin 
	    tableLimitMax 
	    beta
	    isTrial
	    lineNotifyToken
	    dragonCount 
	    jwtToken 
	    platformDisableAdult 
	    platformDisableCustomerService
    }
  }
`
