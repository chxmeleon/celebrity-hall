import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ActionCable from 'actioncable'
import { useAuth } from './AuthContext'

interface ActionCableContextData {
  cable: any
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

/* interface ActionCableConsumerProp { */
/*   children: any */
/*   channel: any  */
/*   onReceive: () => void */
/*   onConnected: () => void */
/*   onDisconnected: () => void */
/*   onRejected: () => void */
/*   onInitialized: () => void */
/* } */
/**/
/* export const ActionCableConsumer: React.FC<ActionCableConsumerProp> = ({ */
/*   children, */
/*   channel, */
/*   onReceive, */
/* }) => { */
/*   const { cable } = useActionCable() */
/*   const [onChannel, setOnChannel] = useState(null) */
/**/
/*   useEffect(() => { */
/*     const newChannel = cable.subscriptions.create( */
/*       { channel }, */
/*       { onReceive } */
/*     ) */
/**/
/*     setOnChannel(newChannel) */
/**/
/*     return () => { */
/*       newChannel.unsubscribe() */
/*     } */
/*   }, [channel, onReceive]) */
/**/
/*   return <ActionCableContext.Consumer>{children}</ActionCableContext.Consumer> */
/* } */
