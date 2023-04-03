import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../views/CollectionGroupsView'

const CollectionPageTemplate = ({ pageContext, path, data }) => {
  const {
    title,
    description,
    consultation,
    collections,
    seoImage,
    headerImage,
    slug,
  } = data.sanityCollectionGroupPage
  const { content } = data.sanityCollectionSeo || {}
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
      consultation={consultation}
      collectionOrder={collections.map(item => item.handle)}
      collections={collectionsWithGroupData}
      pagePath={path}
      seoGatsbyImage={seoImage?.asset.gatsbyImageData}
      headerImage={headerImage?.asset.gatsbyImageData}
      handle={slug.current}
      content={content}
    />
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query CollectionGroupPageQuery($handle: String!, $collections: [String]!) {
    sanityCollectionGroupPage(slug: { current: { eq: $handle } }) {
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
          gatsbyImageData(placeholder: BLURRED, width: 1200)
        }
      }
      title
      description
      consultation
      slug {
        current
      }
    }
    allShopifyCollection(filter: { handle: { in: $collections } }) {
      nodes {
        title
        description
        handle
        image {
          gatsbyImageData(placeholder: BLURRED)
        }
        products {
          id
          handle
          title
          vendor
          images {
            gatsbyImageData(placeholder: BLURRED)
          }
          tags
          metafields {
            key
            value
          }
          variants {
            availableForSale
            price
          }
          priceRangeV2 {
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
    sanityCollectionSeo(handle: { eq: $handle }) {
      content {
        ... on SanityCollectionSEOheading {
          heading
        }
        ... on SanityCollectionSEOtext {
          quote
        }
        ... on SanityCollectionSEOblock {
          blocks: _rawBlock
        }
        ... on SanityCollectionSEOimage {
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
