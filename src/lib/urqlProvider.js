import React from 'react'
import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  Provider,
} from 'urql'
import { authExchange } from '@urql/exchange-auth'
// import { CustomerAccessTokenRenew } from '../mutations/auth'

const SHOPIFY_GRAPHQL_URL = `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}/api/2021-01/graphql.json`

const getAuth = async ({ authState }) => {
  if (!authState) {
    const token = localStorage.getItem('accessToken')
    const expiresAt = localStorage.getItem('expiresAt')
    if (token && expiresAt) {
      return { token, expiresAt }
    }
    return null
  }

  //   const result = await mutate(CustomerAccessTokenRenew, {
  //     customerAccessToken: authState.token,
  //   })

  //   if (result.data.customerAccessToken) {
  //     localStorage.setItem('accessToken', result.data.customerAccessTokenRenew.customerAccessToken.accessToken)
  //     localStorage.setItem('', result.data.refreshLogin.refreshToken)

  //     return {
  //       token: result.data.refreshLogin.token,
  //       refreshToken: result.data.refreshLogin.refreshToken,
  //     }
  //   }

  // // This is where auth has gone wrong and we need to clean up and redirect to a login page
  // localStorage.clear()
  // logout()

  return null
}
// authExchange({
//   getAuth,
// }),

export const client = createClient({
  url: SHOPIFY_GRAPHQL_URL,
  fetchOptions: () => ({
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
    },
  }),
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

export default ({ element }) => <Provider value={client}>{element}</Provider>
