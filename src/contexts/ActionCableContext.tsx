import React, {
  createContext,
  useContext,
  useMemo,
} from 'react'
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
  const value = useMemo(
    () => ({
      cable: ActionCable.createConsumer(
        `wss://staging.vvip88.net/cable?token=${auth}`
      )
    }),
    [auth]
  )

  return (
    <ActionCableContext.Provider value={value}>
      {children}
    </ActionCableContext.Provider>
  )
}

export const useActionCable = () => useContext(ActionCableContext)
