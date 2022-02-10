import { Box } from 'theme-ui'
import React, { useMemo } from 'react'
import { parse } from 'qs'
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

const CollectionImage = ({ image, fallbackAlt }) => {
  const imageData = useShopifyImage({ image, width: 715, height: 445 })
  return <GatsbyImage image={imageData} alt={image.altText || fallbackAlt} />
}

const ProductGrid = ({
  products,
  collectionTitle,
  collectionPath,
  title,
  description,
}) => {
  const sortedProducts = useSortedProducts(products)

  // determine max num of images to show based on sortedProducts length
  // const prodLen = sortedProducts.length
  // let imageNum = Math.floor(prodLen / 10) * 2
  // if (prodLen % 8 === 0 || prodLen % 9 === 0) imageNum += 1

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
            order={i}
          />
        </>
      ))}
      {collectionImages.map((image, i) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            // move this into function
            // also it's not working over 30 items...
            order: i % 4 ? 5 * i + ((i + 1) % 5) : 5 * i + 5,
            gridColumn: 'span 2',
            gridRow: i % 2 ? '' : 'span 2',
            flexGrow: 0,
          }}
        >
          <CollectionImage
            image={image}
            fallbackAlt={`collection-image-${i}`}
          />
        </Box>
      ))}
    </CollectionProductGroup>
  )
}

export default ProductGrid
