import { Box } from 'theme-ui'
import React, { useMemo } from 'react'
import { parse } from 'qs'
import { DateTime } from 'luxon'
import { useLocation } from '@reach/router'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'

const groupProducts = (products, fallback = '') =>
  products.reduce((acc, el) => {
    const { subgroup } = el
    if (subgroup) {
      return {
        ...acc,
        [subgroup]: (acc[subgroup] || []).concat(el),
      }
    }
    acc[fallback] = (acc[fallback] || []).concat(el)
    return acc
  }, {})

const sortProducts = ({ products, sort }) =>
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

const useSortedProductGroups = productGroups => {
  const { search } = useLocation()
  const { sort } = parse(search.replace('?', ''))

  return useMemo(() => {
    if (!sort) return productGroups

    return Object.keys(productGroups).reduce(
      (acc, el) => ({
        ...acc,
        [el]: sortProducts({ products: productGroups[el], sort }),
      }),
      {}
    )
  }, [sort, productGroups])
}

const ProductGrid = ({ products, collectionTitle, collectionPath }) => {
  const productGroups = groupProducts(products)
  const sortedProductGroups = useSortedProductGroups(productGroups)

  return (
    <Box>
      {Object.keys(sortedProductGroups).map(key => (
        <CollectionProductGroup groupType={key} key={key}>
          {productGroups[key].map(product => (
            <CollectionProduct
              key={product.id}
              product={product}
              images={product.images}
              collectionTitle={collectionTitle}
              collectionPath={collectionPath}
            />
          ))}
        </CollectionProductGroup>
      ))}
    </Box>
  )
}

export default ProductGrid
