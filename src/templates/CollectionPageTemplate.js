import React from 'react'
import { graphql } from 'gatsby'
import { useQuery } from 'urql'
import CollectionView, { getCollectionProducts } from '../views/CollectionView'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'

const CollectionPageTemplate = ({ data, pageContext, ...props }) => {
  const [{ data: clientData }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle: pageContext.handle },
  })

  const clientProducts = getCollectionProducts(
    clientData?.collectionByHandle.products
  )
  const { products, handle, image, title, description } = data.shopifyCollection
  const viewProducts = (clientProducts || products).filter(
    ({ tags }) => !tags.includes('hidden')
  )

  return (
    <CollectionView
      title={title.toLowerCase()}
      handle={handle}
      description={description.toLowerCase()}
      image={image}
      products={viewProducts}
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
