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

  const collectionImages = useMemo(() => {
    if (!metafields) return []
    return metafields
      .filter(metafield => metafield?.key.startsWith('collection_image'))
      .map(({ key, reference: { image } }) => ({
        key,
        ...image,
      }))
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [metafields])

  const collectionProducts = useMemo(() => {
    const latestProducts = getCollectionProducts(products)
    const updatedProducts = initialProducts.map(product => {
      const update = latestProducts?.find(({ id }) => id === product.id)
      return {
        ...product,
        ...update,
      }
    })
    return updatedProducts.filter(({ tags }) => !tags.includes('hidden'))
  }, [products, initialProducts])

  return {
    collectionProducts,
    collectionImages,
  }
}
