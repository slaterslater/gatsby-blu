import React from 'react'
import { graphql } from 'gatsby'
import CollectionPage from '../../components/collection/CollectionPage'

const CollectionPageTemplate = ({ data }) => {
  const { products, title, description, handle } = data.shopifyCollection
  const topLevelCollections = [
    'rings',
    'necklaces',
    'bracelets',
    'bridal',
    'newarrivals',
    'best-sellers',
    'earrings',
    'all',
  ]

  return (
    <CollectionPage
      title={title}
      description={description}
      products={products}
      hasSidebar={topLevelCollections.includes(handle)}
      hasFilters={topLevelCollections.includes(handle)}
    />
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query CollectionPage($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      description
      handle
      image {
        src
        altText
      }
      products {
        id
        handle
        title
        images {
          originalSrc
          altText
        }
        variants {
          priceV2 {
            amount
            currencyCode
          }
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
        }
        priceRange {
          minVariantPrice {
            currencyCode
            amount
          }
          maxVariantPrice {
            currencyCode
            amount
          }
        }
      }
    }
  }
`
