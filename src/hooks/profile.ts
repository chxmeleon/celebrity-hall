import { useQuery } from '@apollo/client'
import { useActionCable } from '@/contexts/ActionCableContext'
import types from '@/types'
import { useEffect, useState } from 'react'

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
