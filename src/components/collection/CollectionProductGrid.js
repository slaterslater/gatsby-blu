import { Box } from 'theme-ui'
import React, { useMemo } from 'react'
import { parse } from 'qs'
import { DateTime } from 'luxon'
import { useLocation } from '@reach/router'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'
import BookAConsultationCallout from '../content/BookAConsultationCallout'

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

  // eventually the images will come from shopify or CMS
  const collectionImages = Array.from({ length: 4 }).map(
    (_, i) => sortedProducts[i].images[1]
  )
  console.log({ collectionImages })

  return (
    <CollectionProductGroup title={title} key={collectionTitle}>
      {sortedProducts.map((product, i) => (
        <>
          {collectionPath?.includes('bridal') && i === 6 && (
            <BookAConsultationCallout
              sx={{ gridColumn: 'span 2', m: [0, 0, 4] }}
            />
          )}
          <CollectionProduct
            key={product.id}
            product={product}
            images={product.images}
            collectionTitle={collectionTitle}
            collectionPath={collectionPath}
          />
        </>
      ))}
    </CollectionProductGroup>
  )
}

export default ProductGrid
