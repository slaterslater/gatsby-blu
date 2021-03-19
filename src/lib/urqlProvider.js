import React from 'react'
import { createClient, Provider } from 'urql'

const SHOPIFY_GRAPHQL_URL = `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}/api/2021-01/graphql.json`

export const client = createClient({
  url: SHOPIFY_GRAPHQL_URL,
  fetchOptions: () => ({
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
    },
  }),
})

export default function UrqlProvider(props) {
  return <Provider value={client} {...props} />
}
