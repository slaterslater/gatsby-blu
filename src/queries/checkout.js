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
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            product {
              id
            }
            availableForSale
            title
            image {
              altText
              url
              height
              width
              id
            }
          }
        }
      }
    }
    note
    requiresShipping
    availableShippingRates {
      shippingRates {
        priceV2 {
          amount
          currencyCode
        }
      }
    }
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
  query CheckoutQuery($checkoutId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    node(id: $checkoutId) {
      ... on Checkout {
        ...CheckoutFields
      }
    }
    collection(handle: "you-might-also-like") {
      products(first: 50) {
        nodes {
          id
          title
          images(first: 1) {
            nodes {
              altText
              url
              height
              width
              id
            }
          }
          variants(first: 1) {
            nodes {
              id
              priceV2: price {
                amount
              }
            }
          }
        }
      }
    }
  }
`
