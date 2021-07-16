import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../../views/CollectionGroupsView'

const WanderessGroupsPage = ({ path, data }) => {
  const collections = data.allShopifyCollection.nodes.map(node => {
    if (node.handle === 'wanderess-duo') {
      return {
        ...node,
        title: 'most popular sets',
      }
    }
    return node
  })

  return (
    <CollectionGroupsView
      pageTitle="wanderess collection"
      pageDescription="
gather charms recounting your journey of love, growth, achievement, strength, and wisdom; each unique emblem adorns your soul's truths. pick your chain, pick your charms, tell your story
    "
      collectionOrder={[
        'wanderess-chains',
        'wanderess-charms',
        'wanderess-birthstone',
        'wanderess-duo',
      ]}
      collections={collections}
      pagePath={path}
    />
  )
}

export default WanderessGroupsPage

export const query = graphql`
  {
    allShopifyCollection(
      filter: {
        handle: {
          in: [
            "wanderess-chains"
            "wanderess-charms"
            "wanderess-birthstone"
            "wanderess-duo"
          ]
        }
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
