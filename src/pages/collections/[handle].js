import React from 'react'
import { useQuery } from 'urql'
import CollectionView from '../../views/CollectionView'
import NotFoundView from '../../views/404'
import { COLLECTION_PAGE_QUERY } from '../../queries/collection'
import { getCollectionProducts } from '../../hooks/collection'
// import { useMetafieldValue } from '../../hooks/useMetafield'

const ClientCollectionPage = ({ params: { handle } }) => {
  console.log('CLIENT COLLECTION PAGE', {handle})
  const [{ data }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle },
  })

  if (!data) return false

  const { title, description, metafields = [] } = data?.collection || {}
  const isHidden = metafields
    .filter(field => !!field)
    .some(({ key, value }) => key === 'hidden' && value === 'true')

  if (!data.collection || isHidden) return <NotFoundView />

  const products = getCollectionProducts(data.collection.products)
  return (
    <CollectionView
      handle={handle}
      title={title}
      description={description}
      products={products}
      hasFilters
    />
  )
}

export default ClientCollectionPage
