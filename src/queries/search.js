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
