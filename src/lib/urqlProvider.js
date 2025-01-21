// import React from 'react'
// import { createClient, Provider } from 'urql'

// const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION
// const SHOPIFY_GRAPHQL_URL = `${process.env.GATSBY_SHOPIFY_CHECKOUT_BASE}/api/${API_VERSION}/graphql.json`
// const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
//   process.env.GATSBY_SHOPIFY_STOREFRONT_KEY

// export const client = createClient({
//   url: SHOPIFY_GRAPHQL_URL,
//   fetchOptions: () => ({
//     headers: {
//       'Content-Type': 'application/graphql',
//       'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//     },
//   }),
// })

// export default function UrqlProvider(props) {
//   return <Provider value={client} {...props} />
// }

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION
const SHOPIFY_GRAPHQL_URL = `${process.env.GATSBY_SHOPIFY_CHECKOUT_BASE}/api/${API_VERSION}/graphql.json`
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.GATSBY_SHOPIFY_STOREFRONT_KEY

const client = new Client({
  url: 'https://bluboho-development.myshopify.com/api/2024-04/graphql.json',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  }),
});

export default function UrqlProvider(props) {
  return <Provider value={client} {...props} />
}