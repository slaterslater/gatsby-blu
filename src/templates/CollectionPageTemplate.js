import React, { useContext, useMemo } from 'react'
import { graphql } from 'gatsby'
import { useQuery } from 'urql'
import CollectionView, { getCollectionProducts } from '../views/CollectionView'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'
import { CurrencyContext } from '../contexts/CurrencyContext'

const CollectionPageTemplate = ({ data, pageContext, ...props }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data: clientData }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle: pageContext.handle, countryCode },
  })

  const { products: collectionProducts, metafields } =
    clientData?.collection || {}

  const collectionImages = useMemo(
    () =>
      metafields?.edges
        .filter(({ node }) => node.key.startsWith('collection_image'))
        .map(({ node }) => {
          const imageData = node.reference.image
          return {
            key: node.key,
            ...imageData,
          }
        })
        .sort((a, b) => a.key.localeCompare(b.key)),
    [metafields]
  )

  const clientProducts = getCollectionProducts(collectionProducts)
  const {
    products: sourceProducts,
    handle,
    image,
    title,
    description,
  } = data.shopifyCollection
  const products = useMemo(
    () =>
      (clientProducts || sourceProducts).filter(
        ({ tags }) => !tags.includes('hidden')
      ),
    [clientProducts, sourceProducts]
  )

  return (
    <CollectionView
      title={title.toLowerCase()}
      handle={handle}
      description={description.toLowerCase()}
      image={image}
      collectionImages={collectionImages}
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
`
