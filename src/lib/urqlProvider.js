import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION
const SHOP_NAME = process.env.GATSBY_SHOPIFY_SHOP_NAME
const url = `https://${SHOP_NAME}/api/${API_VERSION}/graphql.json`

const client = new Client({
  url,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      // 'Content-Type': 'application/graphql',
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/graphql+json,',
      'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
    },
  }),
});

export default function UrqlProvider(props) {
  return <Provider value={client} {...props} />
}