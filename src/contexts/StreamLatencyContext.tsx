import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { v4 as uuidV4 } from 'uuid'
import { useActionCable } from './ActionCableContext'

const StreamLatencyContext = createContext<number>(0)
export const StreamLatencyProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [latency, setLatency] = useState(0)

  const { cable } = useActionCable()
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: 'LatencyChannel', uuid: uuidV4() },
      {
        received: (data) => {
          const latency = (Date.now() - new Date(data.t).getTime()) / 1000
          setLatency(latency)
        }
      }
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [cable])

  return (
    <StreamLatencyContext.Provider value={latency}>
      {children}
    </StreamLatencyContext.Provider>
  )
}

export default StreamLatencyContext
