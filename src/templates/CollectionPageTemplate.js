import React from 'react'
import { useQuery } from 'urql'
import CollectionView, { getCollectionProducts } from '../views/CollectionView'
import {
  COLLECTION_PAGE_QUERY,
  COLLECTION_IMAGES_QUERY,
} from '../queries/collection'

const CollectionPageTemplate = ({ data, pageContext, ...props }) => {
  const [{ data: clientData }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle: pageContext.handle },
  })

  const { products: collectionProducts, metafields } =
    clientData?.collectionByHandle || {}

  // change this once COLLECTION_PAGE_QUERY returns MediaImage data
  // currently returns only value ie: ID
  // const ids = metafields?.edges
  //   .filter(({ node }) => node.key.startsWith('collection_image'))
  //   .map(({ node }) => node.value)

  // remove this once COLLECTION_PAGE_QUERY returns MediaImage data
  //
  // const [{ data: collectionImagesData }] = useQuery({
  //   query: COLLECTION_IMAGES_QUERY,
  //   variables: {
  //     ids: [
  //       // 'gid://shopify/Product/6782339055782',
  //       // 'gid://shopify/Product/6782204969126',
  //       // 'gid://shopify/Product/6782338695334',
  //       // 'gid://shopify/MediaImage/21428661911718',
  //       // 'gid://shopify/MediaImage/21428661846182',
  //       // 'gid://shopify/MediaImage/21428659093670',
  //     ],
  //   },
  // })

  // console.log({ clientData, collectionImagesData })

  const clientProducts = getCollectionProducts(collectionProducts)
  const {
    products: sourceProducts,
    handle,
    image,
    title,
    description,
  } = data.shopifyCollection
  const products = (clientProducts || sourceProducts).filter(
    ({ tags }) => !tags.includes('hidden')
  )

  return (
    <CollectionView
      title={title.toLowerCase()}
      handle={handle}
      description={description.toLowerCase()}
      image={image}
      products={products}
      hasFilters
    />
  )
}

export default CollectionPageTemplate
