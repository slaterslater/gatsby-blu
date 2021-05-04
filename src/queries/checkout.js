import gql from 'graphql-tag'

export const CHECKOUT_FRAGMENT = gql`
  fragment CheckoutFields on Checkout {
    id
    webUrl
    completedAt
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
            title
            priceV2 {
              amount
              currencyCode
            }
            presentmentPrices(first: 5) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
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
`

export const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  query CheckoutQuery($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ...CheckoutFields
      }
    }
  }
`
