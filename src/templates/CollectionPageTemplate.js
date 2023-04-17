import React from 'react'
import { graphql } from 'gatsby'
import CollectionView from '../views/CollectionView'
import { useLatestCollection } from '../hooks/collection'
import { useMetafieldValue } from '../hooks/useMetafield'

const CollectionPageTemplate = ({ data, pageContext, ...props }) => {
  const { products, handle, image, title, description, seo, metafields } =
    data.shopifyCollection
  const { content } = data.sanityCollectionSeo || {}
  const isBeloved = useMetafieldValue('isBeloved', metafields)
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
      content={content}
      isBeloved={isBeloved === 'true'}
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
      metafields {
        key
        value
      }
      seo {
        title
        description
      }
      image {
        gatsbyImageData(placeholder: BLURRED)
        originalSrc
      }
      products {
        # availableForSale ADDED TO VARIANTS
        id
        handle
        title
        vendor
        images {
          gatsbyImageData(placeholder: BLURRED, width: 360)
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
