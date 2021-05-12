import gql from 'graphql-tag'

export const SEARCH_PRODUCT_FRAGMENT = gql`
  fragment ProductSearchFields on Product {
    id
    handle
    title
    availableForSale
    tags
    presentmentPriceRanges(first: 5) {
      edges {
        node {
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
    }
    images(first: 2) {
      edges {
        node {
          altText
          originalSrc
          height
          width
          id
        }
      }
    }
  }
`

export const SEARCH_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  query($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: RELEVANCE) {
      edges {
        node {
          ... on Product {
            ...ProductSearchFields
          }
        }
      }
    }
  }
`
