import gql from 'graphql-tag'

import { SEARCH_PRODUCT_FRAGMENT } from './search'
import { PRODUCT_PRICE_RANGE_FRAGMENT } from './product'

export const PAGINATED_COLLECTION_PRODUCTS_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  query PaginatedCollectionProducts(
    $handle: String!
    $after: String
    $countryCode: CountryCode
  ) @inContext(country: $countryCode) {
    collection(handle: $handle) {
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

export const COLLECTION_PAGE_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  ${PRODUCT_PRICE_RANGE_FRAGMENT}
  query CollectionPageQuery($handle: String!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    collection(handle: $handle) {
      title
      description
      metafields(first: 5) {
        edges {
          node {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
      products(first: 250) {
        edges {
          cursor
          node {
            variants(first: 50) {
              edges {
                node {
                  priceV2 {
                    currencyCode
                    amount
                  }
                }
              }
            }
            ... on Product {
              metafields(first: 250) {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
              ...ProductSearchFields
              ...ProductPriceRangeFields
            }
          }
        }
      }
    }
  }
`
