import { useQuery } from '@apollo/client'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'
import { useEffect, useState } from 'react'
import { GET_PROFILE } from '@/gql/profile'

export const useProfile = (profileId: string | undefined) => {
  const { cable } = useActionCable()
  const [userData, setUserData] = useState('')
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'ProfileChannel', profileId },
      {
        received: (data: any) => {
          setUserData(data)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [cable, userData, profileId])
  return { userData }
}

export const useWallet = () => {
  const { data: user, refetch } = useQuery(GET_PROFILE)

  useEffect(() => {
    refetch()
  }, [refetch])

  const { cable } = useActionCable()

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'WalletChannel' },
      {
        received: (data) => {
          if (data) {
            refetch()
          }
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable, refetch])

  return { user }
}
