<<<<<<< HEAD
import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query Profile {
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
||||||| parent of d62e4cd ([FEATURE] connect websocket game's status)
=======
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
>>>>>>> d62e4cd ([FEATURE] connect websocket game's status)
