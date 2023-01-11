import { useAuth } from '@/contexts/AuthContext'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('user')
  const { auth } = useAuth()
  console.log(auth)

  return {
    headers: {
      ...headers,
      authorization: authToken ? `UserBearer ${authToken}` : ''
    }
  }
})

/* const errorLink = onError(({ graphQLErrors, networkError }) => { */
/*   if (graphQLErrors) */
/*     graphQLErrors.forEach(({ message, locations, path, extensions }) => { */
/*       console.error( */
/*         `[GraphQL error]: Message: ${message}, Location: ${locations?.join('/') || ''}, Path: ${path?.join('/') || ''}`, */
/*         extensions, */
/*       ) */
/*       if (extensions && extensions.code === 'invalid-jwt') { */
/*         notification.info({ message: '連線已過期，將重新整理此畫面' }) */
/*         setTimeout(() => window.location.reload(), 3000) */
/*       } */
/*     }) */
/**/
/*   if (networkError) console.error('[Network error]:', networkError) */
/* }) */

const httpLink = createHttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT })
export const createApolloClient = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  return apolloClient
}
