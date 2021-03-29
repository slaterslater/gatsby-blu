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
              firstName
              lastName
              name
              address1
              address2
              city
              provinceCode
              zip
              countryCodeV2
            }
            totalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 250) {
              edges {
                node {
                  title
                  quantity
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
