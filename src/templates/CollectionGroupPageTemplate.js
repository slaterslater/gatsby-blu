import React from 'react'
import { graphql } from 'gatsby'
import CollectionGroupsView from '../views/CollectionGroupsView'

const CollectionPageTemplate = ({ pageContext, path, data }) => {
  const { title, description, collections, seoImage, headerImage } =
    data.sanityCollectionGroupPage

  const collectionsWithGroupData = data.allShopifyCollection.nodes.map(node => {
    const group = collections.find(
      groupNode => groupNode.handle === node.handle
    )
    return {
      ...node,
      title: group?.title || node.title,
    }
  })

  console.log({ collectionsWithGroupData })
  // DELETE makes temp collection of x size
  // const tempcollection = n => ({
  //   ...collectionsWithGroupData,
  //   // products: collectionsWithGroupData[0].products.slice(0, n),
  // })
  const tempCollection = n => ({
    ...collectionsWithGroupData,
    products: collectionsWithGroupData[0].products.slice(0, n),
  })
  // const tempCollection = n =>
  //   collectionsWithGroupData.map(collection => ({
  //     ...collection,
  //     products: collection.products.slice(0, n),
  //   }))

  const tempCollections = [
    ...collectionsWithGroupData,
    ...collectionsWithGroupData,
    ...collectionsWithGroupData,
  ]

  // const tempCollections2 = [
  //   tempCollection(7),
  //   tempCollection(11),
  //   tempCollection(6),
  // ]

  const tempCollections2 = [7, 11, 6].map(num => {
    const temp = tempCollection(num)
    return temp
  })

  // console.log({ tempCollections, tempCollections2 })

  const col = n =>
    collectionsWithGroupData.map(collection => ({
      ...collection,
      products: collection.products.slice(0, n),
    }))

  const temps = [7, 11, 6].reduce((arr, num) => arr.concat(col(num)), [])

  console.log({ temps })

  return (
    <CollectionGroupsView
      pageTitle={title}
      pageDescription={description}
      collectionOrder={collections.map(item => item.handle)}
      // collections={[tempcollection(7), tempcollection(11), tempcollection(6)]}/
      // collections={collectionsWithGroupData}
      // collections={temps}
      collections={tempCollections}
      pagePath={path}
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
