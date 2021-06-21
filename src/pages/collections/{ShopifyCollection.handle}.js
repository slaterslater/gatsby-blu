import React from 'react'
import { graphql } from 'gatsby'
import CollectionView from '../../views/CollectionView'

const CollectionPageTemplate = ({ data }) => {
  const { products, handle } = data.shopifyCollection

  const title = data.shopifyCollection.title.toLowerCase()
  const description = data.shopifyCollection.description?.toLowerCase()

  return (
    <CollectionView
      title={title}
      handle={handle}
      description={description}
      products={products}
      hasFilters
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
        height
        width
      }
      products {
        availableForSale
        id
        handle
        title
        vendor
        images {
          originalSrc
          altText
          height
          width
        }
        tags
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
