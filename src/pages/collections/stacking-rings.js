import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../../views/CollectionGroupsView'

const StackingRingsGroupsPage = ({ path, data }) => {
  const collections = data.allShopifyCollection.nodes.map(node => {
    if (node.handle === 'stacking-rings-gift-guide') {
      return {
        ...node,
        title: 'stacking rings',
      }
    }
    return node
  })

  return (
    <CollectionGroupsView
      pageTitle="stacking rings"
      pageDescription=""
      collectionOrder={['diamond-stackers', 'stacking-rings-gift-guide']}
      collections={collections}
      pagePath={path}
    />
  )
}

export default StackingRingsGroupsPage

export const query = graphql`
  {
    allShopifyCollection(
      filter: {
        handle: { in: ["diamond-stackers", "stacking-rings-gift-guide"] }
      }
    ) {
      nodes {
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
  }
`
