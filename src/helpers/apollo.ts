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



const httpLink = createHttpLink({ uri: `${process.env.URL_ENDPOINT}/graphql` })

export const createApolloClient = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  return apolloClient
}
