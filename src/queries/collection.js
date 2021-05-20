import gql from 'graphql-tag'

import { SEARCH_PRODUCT_FRAGMENT } from './search'

export const PAGINATED_COLLECTION_PRODUCTS_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  query PaginatedCollectionProducts($handle: String!, $after: String) {
    collectionByHandle(handle: $handle) {
      products(first: 50, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            ... on Product {
              ...ProductSearchFields
            }
          }
        }
      }
    }
  }
`
