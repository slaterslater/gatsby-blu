import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'
import { useMetafieldValue } from '../hooks/useMetafield'

export const useProductPrice = product => {
  const { metafields, priceRangeV2 } = product
  const minVariantPrice = priceRangeV2.minVariantPrice.amount
  const hasRange = minVariantPrice !== priceRangeV2.maxVariantPrice.amount

  const byAppointmentOnly = useMetafieldValue('appt_only', metafields)
  const offersPairs = useMetafieldValue('offers_pairs', metafields)

  if (byAppointmentOnly === 'true') return ['', false]
  if (offersPairs === 'true') return [minVariantPrice * 2, false]

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
  badges,
}) => {
  const [price, hasRange] = useProductPrice(product)
  const title = useProductTitle(product.title)
  const [firstImage, secondImage] = images
  const { handle, tags, availableForSale, metafields } = product
  const visitTag = tags.find(tag => tag.startsWith('visit'))?.replace('-', ' ')
  const badge = badges.find(({ name }) => name === visitTag)
  // console.log({ visitBadge, badges, tags })

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
      metafields={metafields}
      badge={badge}
    />
  )
}

export default CollectionProduct
