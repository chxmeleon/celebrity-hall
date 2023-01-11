import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { createApolloClient } from '../helpers/apollo'

export const ApiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [authToken] = useLocalStorage<string | null>('user', null)
  const apolloClient = createApolloClient(authToken)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
