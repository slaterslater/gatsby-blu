// import { graphql } from 'gatsby'

export const PRODUCT_QUERY = `
  query($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: RELEVANCE) {
    edges {
      node {
        id
        handle
        title
        availableForSale
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
