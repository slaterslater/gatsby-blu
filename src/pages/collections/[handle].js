import React from 'react'
import { useQuery } from 'urql'
import CollectionView, {
  getCollectionProducts,
} from '../../views/CollectionView'
import NotFoundView from '../../views/404'
import { COLLECTION_PAGE_QUERY } from '../../queries/collection'

const ClientCollectionPage = ({ params: { handle } }) => {
  const [{ data }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle },
  })

  if (data?.collectionByHandle) {
    const products = getCollectionProducts(data.collectionByHandle.products)
    return (
      <CollectionView
        handle={handle}
        title={data.collectionByHandle.title}
        description={data.collectionByHandle.description}
        products={products}
        hasFilters
      />
    )
  }

  if (data && !data.collectionByHandle) return <NotFoundView />
  return false
}

export default ClientCollectionPage
