import gql from 'graphql-tag'

export const PRODUCT_QUERY = gql`
  query($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: RELEVANCE, reverse: true) {
      edges {
        node {
          id
          handle
          title
          availableForSale
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
          variants {
            id
            shopifyId
            priceNumber
            presentmentPrices {
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
            sku
            selectedOptions {
              name
              value
            }
          }
          images(first: 2) {
            edges {
              node {
                altText
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`
