import React from 'react'
import { graphql } from 'gatsby'
import CollectionView from '../views/CollectionView'
import { useLatestCollection } from '../hooks/collection'

const CollectionPageTemplate = ({ data, pageContext, ...props }) => {
  const { products, handle, image, title, description, seo } =
    data.shopifyCollection
  const { collectionProducts, collectionImages } = useLatestCollection(
    handle,
    products
  )

  return (
    <CollectionView
      seo={seo}
      title={title.toLowerCase()}
      handle={handle}
      description={description.toLowerCase()}
      image={image}
      collectionImages={collectionImages}
      products={collectionProducts}
      card={data.card}
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
      seo {
        title
        description
      }
      handle
      image {
        src
        #altText
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
          #altText
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
    card: sanityCard(collectionHandle: { eq: $handle }) {
      title
      subtitle
      text
      stones
      amplify
      amulets
      collectionHandle
      energy
      image {
        asset {
          gatsbyImageData(
            width: 250
            height: 425
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
      icons {
        asset {
          gatsbyImageData(
            width: 285
            height: 75
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
    }
  }
`
