import gql from 'graphql-tag'

import { SEARCH_PRODUCT_FRAGMENT } from './search'
import {
  PRODUCT_METAFIELDS_FRAGMENT,
  PRODUCT_PRICE_RANGE_FRAGMENT,
} from './product'

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
  ${PRODUCT_METAFIELDS_FRAGMENT}
  query CollectionPageQuery($handle: String!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    collection(handle: $handle) {
      title
      description
      metafields(
        identifiers: [
          { namespace: "custom", key: "hidden" }
          { namespace: "my_fields", key: "collection_image_1" }
          { namespace: "my_fields", key: "collection_image_2" }
          { namespace: "my_fields", key: "collection_image_3" }
          { namespace: "my_fields", key: "collection_image_4" }
          { namespace: "my_fields", key: "collection_image_5" }
          { namespace: "my_fields", key: "collection_image_6" }
        ]
      ) {
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
      products(first: 250) {
        edges {
          cursor
          node {
            variants(first: 50) {
              edges {
                node {
                  id
                  priceV2 {
                    currencyCode
                    amount
                  }
                }
              }
            }
            ... on Product {
              ...ProductMetafields
              ...ProductSearchFields
              ...ProductPriceRangeFields
            }
          }
        }
      }
    }
  }
`
// 2DO this should take a fragment and return a full query?
export const getSortFilterQuery = () => {}
