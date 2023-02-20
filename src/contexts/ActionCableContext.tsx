import React, { createContext, useContext, useMemo } from 'react'
import ActionCable from 'actioncable'
import { useAuth } from './AuthContext'

interface ActionCableContextData {
  cable: ActionCable.Cable
}

const ActionCableContext = createContext<ActionCableContextData>(
  {} as ActionCableContextData
)

export const ActionCableProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { auth } = useAuth()
  const endpoint = import.meta.env.VITE_SOCKET_ENDPOINT
  const value = useMemo(
    () => ({
      cable: ActionCable.createConsumer(`${endpoint}?token=${auth}`)
    }),
    [auth, endpoint]
  )

  return (
    <ActionCableContext.Provider value={value}>
      {children}
    </ActionCableContext.Provider>
  )
}

export const useActionCable = () => useContext(ActionCableContext)
