import { gql } from 'graphql-tag'

export const CUSTOMER_QUERY = `
  query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      firstName
    }
  }
`
