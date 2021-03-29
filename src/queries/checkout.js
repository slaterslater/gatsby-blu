import gql from 'graphql-tag'

export const CHECKOUT_QUERY = gql`
  query CheckoutQuery($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        lineItems(first: 250) {
          edges {
            node {
              id
              quantity
              title
              customAttributes {
                key
                value
              }
              variant {
                selectedOptions {
                  name
                  value
                }
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
                title
                image {
                  altText
                  originalSrc
                }
              }
            }
          }
        }
        requiresShipping
        subtotalPriceV2 {
          amount
          currencyCode
        }
        totalPriceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`
