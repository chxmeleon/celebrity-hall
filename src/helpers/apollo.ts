import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const withAuthLink = (authToken: string | null) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: authToken ? `UserBearer ${authToken}` : ''
    }
  }))

const httpLink = createHttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT })
export const createApolloClient = (authToken: string | null) => {
  const apolloClient = new ApolloClient({
    link: withAuthLink(authToken).concat(httpLink),
    cache: new InMemoryCache()
  })
  return apolloClient
}
