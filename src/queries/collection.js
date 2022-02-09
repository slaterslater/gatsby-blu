import gql from 'graphql-tag'

import { SEARCH_PRODUCT_FRAGMENT } from './search'
import { PRODUCT_PRICE_RANGE_FRAGMENT } from './product'

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

export const COLLECTION_PAGE_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  ${PRODUCT_PRICE_RANGE_FRAGMENT}
  query CollectionPageQuery($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      description
      metafields(first: 5) {
        edges {
          node {
            key
            value
            # reference {
            #   ... on MediaImage {
            #     image {
            #       originalSrc
            #     }
            #   }
            # }
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

// ideally this isn't needed and can just get reference from metafields in collectionByhandle
export const COLLECTION_IMAGES_QUERY = gql`
  query ($ids: [ID!]!) {
    nodes(ids: $ids) {
      id
      # ... on Product {
      #   id
      #   title
      #   handle
      #   options {
      #     name
      #     values
      #   }
      # }
      # ... on MediaImage {
      #   image {
      #     originalSrc
      #   }
      # }
    }
  }
`
