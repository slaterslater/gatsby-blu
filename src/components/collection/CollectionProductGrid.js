import { Box } from 'theme-ui'
import React, { useMemo } from 'react'
import { parse } from 'qs'
import { DateTime } from 'luxon'
import { useLocation } from '@reach/router'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'

export const sortProducts = ({ products, sort }) =>
  products.sort((a, b) => {
    switch (sort) {
      case 'latest':
        return DateTime.fromISO(b.updatedAt) - DateTime.fromISO(a.updatedAt)
      case 'price-asc':
        return (
          a.priceRange.minVariantPrice.amount -
          b.priceRange.minVariantPrice.amount
        )
      case 'price-desc':
        return (
          b.priceRange.minVariantPrice.amount -
          a.priceRange.minVariantPrice.amount
        )
      default:
        return 0
    }
  })

const useSortedProducts = products => {
  const { search } = useLocation()
  const { sort } = parse(search.replace('?', ''))

  return useMemo(() => {
    if (!sort) return products

    return sortProducts({ products, sort })
  }, [sort, products])
}

const ProductGrid = ({
  products,
  collectionTitle,
  collectionPath,
  title,
  description,
}) => {
  const sortedProducts = useSortedProducts(products)

  return (
    <CollectionProductGroup title={title} key={collectionTitle}>
      {sortedProducts.map(product => (
        <CollectionProduct
          key={product.id}
          product={product}
          images={product.images}
          collectionTitle={collectionTitle}
          collectionPath={collectionPath}
        />
      ))}
    </CollectionProductGroup>
  )
}

export default ProductGrid
