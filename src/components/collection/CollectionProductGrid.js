import React, { useMemo } from 'react'
import { parse } from 'qs'
import { Box } from 'theme-ui'
import { DateTime } from 'luxon'
import { useLocation } from '@reach/router'
import { GatsbyImage } from 'gatsby-plugin-image'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'
import BookAConsultationCallout from '../content/BookAConsultationCallout'
import { useShopifyImage } from '../../hooks/shopifyImage'

export const sortProducts = ({ products, sort }) =>
  products.sort((a, b) => {
    switch (sort) {
      case 'latest':
        return DateTime.fromISO(b.updatedAt) - DateTime.fromISO(a.updatedAt)
      case 'price-asc':
        return (
          a.priceRangeV2.minVariantPrice.amount -
          b.priceRangeV2.minVariantPrice.amount
        )
      case 'price-desc':
        return (
          b.priceRangeV2.minVariantPrice.amount -
          a.priceRangeV2.minVariantPrice.amount
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

const CollectionImage = ({ image, tall = false }) => {
  const imageData = useShopifyImage({
    image,
    width: 715,
    height: tall ? 900 : 445,
  })
  return <GatsbyImage image={imageData} alt="" />
}

const ProductGrid = ({
  products,
  collectionTitle,
  collectionPath,
  title,
  description,
  collectionImages,
  badges,
}) => {
  const sortedProducts = useSortedProducts(products)
  const prodLen = sortedProducts.length

  const collectionImageOrder = i => {
    const n = i % 4
    const x = n ? n + 1 : 5
    return i * 5 + x
  }

  // determine max num of images to show based on sortedProducts length
  // calculate order to insert images into product grid
  const orderedImages = useMemo(() => {
    const colImgLen = collectionImages?.length
    if (!colImgLen) return []
    let imageNum = Math.floor(prodLen / 10) * 2
    if ([8, 9].some(n => n === prodLen % 10)) imageNum += 1
    imageNum = colImgLen > imageNum ? imageNum : colImgLen
    return Array.from({ length: imageNum }).map((_, i) => ({
      ...collectionImages[i],
      order: collectionImageOrder(i),
    }))
  }, [prodLen, collectionImages])

  return (
    <CollectionProductGroup title={title} key={collectionTitle}>
      {sortedProducts.map((product, i) => (
        <Box key={product.id} sx={{ order: i }}>
          <CollectionProduct
            product={product}
            images={product.images}
            collectionTitle={collectionTitle}
            collectionPath={collectionPath}
            badges={badges}
          />
        </Box>
      ))}
      {collectionPath?.includes('bridal') && (
        <BookAConsultationCallout sx={{ order: 7, gridColumn: 'span 2' }} />
      )}
      {orderedImages.map((image, i) => (
        <Box
          key={`collection-image-${i}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            order: image.order,
            gridColumn: 'span 2',
            gridRow: i % 2 ? '' : 'span 2',
            flexGrow: 0,
          }}
        >
          <CollectionImage image={image} tall={!(i % 2)} />
        </Box>
      ))}
    </CollectionProductGroup>
  )
}

export default ProductGrid
