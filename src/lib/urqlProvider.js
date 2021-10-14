import React from 'react'
import { createClient, Provider } from 'urql'

// const SHOPIFY_GRAPHQL_URL = `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}/api/2021-04/graphql.json`

const SHOPIFY_GRAPHQL_URL = `${process.env.GATSBY_SHOPIFY_CHECKOUT_BASE}/api/2021-10/graphql.json`
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.GATSBY_SHOPIFY_STOREFRONT_KEY

export const client = createClient({
  url: SHOPIFY_GRAPHQL_URL,
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  }),
})

export default function UrqlProvider(props) {
  return <Provider value={client} {...props} />
}
