import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'

export const useProductPrice = product => {
  const byAppointmentOnly = product.metafields?.some(
    ({ key, value }) => key === 'appt_only' && value === 'true'
  )
  if (byAppointmentOnly) return ['', '']

  const minVariantPrice = product.priceRangeV2.minVariantPrice.amount

  const hasRange =
    minVariantPrice !== product.priceRangeV2.maxVariantPrice.amount

  // const minVariant = product.variants.find(
  //   variant => variant.price === product.priceRangeV2.minVariantPrice.amount
  // )
  // const minVariant = product.variants.find(
  //   variant =>
  //     variant.priceV2.currencyCode ===
  //       product.priceRange.minVariantPrice.currencyCode &&
  //     variant.priceV2.amount === product.priceRange.minVariantPrice.amount
  // )

  // console.log({ minVariant, product })

  return [minVariantPrice, hasRange]
}

const CollectionProduct = ({
  product,
  collectionTitle,
  collectionPath,
  images,
}) => {
  const [price, hasRange] = useProductPrice(product)
  const title = useProductTitle(product.title)
  const [firstImage, secondImage] = images
  const { handle, tags, availableForSale } = product

  return (
    <ProductListItem
      to={`/products/${handle}`}
      linkState={{ collectionTitle, collectionPath }}
      hasRange={hasRange}
      price={price}
      title={title}
      firstImage={firstImage}
      secondImage={secondImage}
      tags={tags}
      availableForSale={availableForSale}
    />
  )
}

export default CollectionProduct
