import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../views/CollectionGroupsView'

const CollectionPageTemplate = ({ pageContext, path, data }) => {
  const collections = data.allShopifyCollection.nodes.map(node => {
    const group = data.sanityCollectionGroupPage.collections.find(
      groupNode => groupNode.handle === node.handle
    )

    return {
      ...node,
      title: group?.title || node.title,
    }
  })

  console.log(data.sanityCollectionGroupPage.image)

  return (
    <CollectionGroupsView
      pageTitle={data.sanityCollectionGroupPage.title}
      pageDescription={data.sanityCollectionGroupPage.description}
      collectionOrder={data.sanityCollectionGroupPage.collections.map(
        item => item.handle
      )}
      collections={collections}
      pagePath={path}
      isTruncated={data.sanityCollectionGroupPage.isTruncated}
      seoGatsbyImage={
        data.sanityCollectionGroupPage.seoImage?.asset.gatsbyImageData
      }
      headerImage={
        data.sanityCollectionGroupPage.headerImage?.asset.gatsbyImageData
      }
    />
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query CollectionGroupPageQuery($id: String!, $collections: [String]!) {
    sanityCollectionGroupPage(id: { eq: $id }) {
      collections {
        handle
        title
      }
      seoImage: image {
        asset {
          gatsbyImageData(width: 1200)
        }
      }
      headerImage: image {
        asset {
          gatsbyImageData(width: 1200)
        }
      }
      title
      description
      isTruncated
    }
    allShopifyCollection(filter: { handle: { in: $collections } }) {
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
