import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ActionCable from 'actioncable'
import { useAuth } from './AuthContext'

interface ActionCableContextData {
  cable: ActionCable.Cable
}

const ActionCableContext = createContext<ActionCableContextData>(
  {} as ActionCableContextData
)

export const ActionCableProvider = ({
  children
}: {
  children: JSX.Element
}) => {
  const { auth } = useAuth()
  const value = useMemo(
    () => ({
      cable: ActionCable.createConsumer(
        `ws://staging.vvip99.net/cable?token=${auth}`
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
