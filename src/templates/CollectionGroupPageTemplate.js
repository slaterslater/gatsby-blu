import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../views/CollectionGroupsView'

const CollectionPageTemplate = ({ pageContext, path, data }) => {
  const {
    title,
    description,
    collections,
    isTruncated,
    seoImage,
    headerImage,
  } = data.sanityCollectionGroupPage

  const collectionsWithGroupData = data.allShopifyCollection.nodes.map(node => {
    const group = collections.find(
      groupNode => groupNode.handle === node.handle
    )
    return {
      ...node,
      title: group?.title || node.title,
    }
  })

  return (
    <CollectionGroupsView
      pageTitle={title}
      pageDescription={description}
      collectionOrder={collections.map(item => item.handle)}
      collections={collectionsWithGroupData}
      pagePath={path}
      isTruncated={isTruncated}
      seoGatsbyImage={seoImage?.asset.gatsbyImageData}
      headerImage={headerImage?.asset.gatsbyImageData}
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
            url
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
