import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../views/CollectionGroupsView'

const CollectionPageTemplate = ({ path, data }) => {
  const collections = data.allShopifyCollection.nodes.map(node => {
    const group = data.sanityCollectionGroupPage.collections.items.find(
      groupNode => groupNode.slug.current === node.handle
    )

    return {
      ...node,
      title: group?.title || node.title,
    }
  })

  return (
    <CollectionGroupsView
      pageTitle={data.sanityCollectionGroupPage.title}
      pageDescription={data.sanityCollectionGroupPage.description}
      collectionOrder={data.sanityCollectionGroupPage.collections.items.map(
        item => item.handle
      )}
      collections={collections}
      pagePath={path}
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
          id
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
