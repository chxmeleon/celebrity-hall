import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('user')
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
})

const httpLink = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

export const createApolloClient = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  return apolloClient
}
