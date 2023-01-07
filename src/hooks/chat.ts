import { useState, useCallback } from 'react'

const useMessages = (initialValue = []) => {
  const [messages, setMessages] = useState<Array<[]>>(initialValue)

  const addMessage = useCallback(
    (msg: any) => {
      setMessages((messages) => [...messages, msg])
      setTimeout(() => {
        setMessages((current) => {
          const n = [...current]
          n.shift()
          return n
        })
      }, 15000)
    },
    [setMessages]
  )

  return [messages, addMessage]
}

export default useMessages
