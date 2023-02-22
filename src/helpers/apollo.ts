import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'

const withAuthLink = (authToken: string | null) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: authToken ? `UserBearer ${authToken}` : ''
    }
  }))

const httpLink = createHttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT })
const batchHttpLink = new BatchHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  batchMax: 10,
  batchInterval: 20
})

export const createApolloClient = (authToken: string | null) => {
  const apolloClient = new ApolloClient({
    link: withAuthLink(authToken).concat(httpLink),
    cache: new InMemoryCache()
  })
  return apolloClient
}
