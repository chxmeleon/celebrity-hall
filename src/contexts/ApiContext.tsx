import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { createApolloClient } from '../helpers/apollo'

export const ApiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const apolloClient = createApolloClient()
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
