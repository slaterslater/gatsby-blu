import React from 'react'
import { createClient, Provider } from 'urql'

const SHOP_ID = `blubohoo`
const SHOPIFY_GRAPHQL_URL = `https://${SHOP_ID}.myshopify.com/api/2021-01/graphql.json`
const STOREFRONT_TOKEN = `99ee5e5e176719e7737fcb389281ef22`

const client = createClient({
  url: SHOPIFY_GRAPHQL_URL,
  fetchOptions: () => ({
    headers: {
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
  }),
})

export default ({ element }) => <Provider value={client}>{element}</Provider>
