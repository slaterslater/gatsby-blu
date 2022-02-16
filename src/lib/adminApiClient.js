import { GraphQLClient } from 'graphql-request'

const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION
const url = `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}/admin/api/${API_VERSION}/graphql.json`

const getClient = () =>
  new GraphQLClient(url, {
    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_API_NEWSLETTER_PASSWORD}`,
      'Content-Type': 'application/json',
    },
  })

export default getClient
