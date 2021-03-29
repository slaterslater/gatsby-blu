import gql from 'graphql-tag'

export const CUSTOMER_QUERY = gql`
  query CustomerQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      firstName
      lastName
      orders(first: 250) {
        edges {
          node {
            orderNumber
            shippingAddress {
              name
              address1
              address2
              company
              formattedArea
              zip
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            totalPriceV2 {
              amount
              currencyCode
            }
            fulfillmentStatus
            financialStatus
            lineItems(first: 250) {
              edges {
                node {
                  title
                  quantity
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  discountedTotalPrice {
                    amount
                    currencyCode
                  }
                  discountAllocations {
                    allocatedAmount {
                      amount
                      currencyCode
                    }
                    discountApplication {
                      allocationMethod
                      targetSelection
                      targetType
                    }
                  }
                  customAttributes {
                    key
                    value
                  }
                  variant {
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      originalSrc
                      altText
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
