import gql from 'graphql-tag'

export const CUSTOMER_QUERY = gql`
  query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      firstName
      orders(first: 250) {
        edges {
          node {
            orderNumber
            fulfillmentStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            financialStatus
          }
        }
      }
    }
  }
`
