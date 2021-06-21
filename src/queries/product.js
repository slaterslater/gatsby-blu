import gql from 'graphql-tag'

export const PRODUCT_PRICE_RANGE_FRAGMENT = gql`
  fragment ProductPriceRangeFields on Product {
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      availableForSale
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            currentlyNotInStock
            title
            selectedOptions {
              name
              value
            }
            quantityAvailable
            presentmentPrices(first: 100) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
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
