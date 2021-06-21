import React from 'react'
import { useQuery } from 'urql'
import Layout from '../../components/layout'
import CollectionView from '../../views/CollectionView'
import NotFoundView from '../../views/404'
import { COLLECTION_PAGE_QUERY } from '../../queries/collection'

const ClientCollectionPage = ({ params: { handle } }) => {
  const [{ data, fetching, error }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle },
  })

  if (data?.collectionByHandle)
    return (
      <CollectionView
        title={data.collectionByHandle.title}
        description={data.collectionByHandle.description}
        products={data.collectionByHandle.products.edges.map(({ node }) => ({
          ...node,
          variants: node.variants.edges.map(({ node }) => node),
          images: node.images.edges.map(({ node }) => node),
        }))}
        hasFilters
      />
    )

  if (data && !data.collectionByHandle) return <NotFoundView />
  return false
}

export default ClientCollectionPage
