import { useContext, useMemo } from 'react'
import { useQuery } from 'urql'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'
import { getCollectionProducts } from '../views/CollectionView'

export const useLatestCollection = (handle, initialProducts) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data: latestData }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle, countryCode },
  })
  const { products, metafields } = latestData?.collection || {}
  const latestProducts = getCollectionProducts(products)

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

  const collectionProducts = useMemo(
    () =>
      (latestProducts || initialProducts).filter(
        ({ tags }) => !tags.includes('hidden')
      ),
    [latestProducts, initialProducts]
  )

  return {
    collectionProducts,
    collectionImages,
  }
}
