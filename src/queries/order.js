import gql from 'graphql-tag'

const ORDER_SUMMARY_FIELDS = gql`
  fragment OrderSummaryFields on Order {
    orderNumber
    fulfillmentStatus
    totalPriceV2 {
      amount
      currencyCode
    }
    financialStatus
  }
`

export const ORDER_QUERY = gql`
  query($customerAccessToken: String!, $id: ID!) {
    node(id: $id, customerAccessToken: $customerAccessToken) {
      id
      ... on Order {
        ${ORDER_SUMMARY_FIELDS}
      }
    }
  }
`
