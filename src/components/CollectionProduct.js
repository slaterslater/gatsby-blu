import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'
import { useMetafieldValue } from '../hooks/useMetafield'

export const useProductPrice = product => {
  const { metafields, priceRangeV2, compareAtPriceRange } = product
  const minVariantPrice = priceRangeV2.minVariantPrice.amount
  const hasRange = minVariantPrice !== priceRangeV2.maxVariantPrice.amount
  const compareAmount = compareAtPriceRange?.maxVariantPrice.amount
  const compareAtPrice = compareAmount !== '0.0' ? compareAmount : null

  const byAppointmentOnly = useMetafieldValue('appt_only', metafields)
  const offersPairs = useMetafieldValue('offers_pairs', metafields)

  if (byAppointmentOnly === 'true') return ['', false, compareAtPrice]
  if (offersPairs === 'true')
    return [minVariantPrice * 2, false, compareAtPrice]

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

  return [minVariantPrice, hasRange, compareAtPrice]
}

const CollectionProduct = ({
  product,
  collectionTitle,
  collectionPath,
  images,
  badges = [],
  allowQuickAdd,
  showLabel = true,
}) => {
  const [price, hasRange, compareAtPrice] = useProductPrice(product)
  const title = useProductTitle(product.title)
  const [firstImage, secondImage] = images
  const { handle, tags, availableForSale, metafields, options, variants } =
    product
  const visitTag = tags.find(tag => tag.startsWith('visit'))?.replace('-', ' ')
  const badge = badges.find(({ name }) => name === visitTag)

  return (
    <ProductListItem
      to={`/products/${handle}`}
      linkState={{ collectionTitle, collectionPath }}
      hasRange={hasRange}
      price={price}
      compareAtPrice={compareAtPrice}
      title={title}
      firstImage={firstImage}
      secondImage={secondImage}
      tags={tags}
      availableForSale={availableForSale}
      metafields={metafields}
      allowQuickAdd={allowQuickAdd}
      badge={badge}
      showLabel={showLabel}
      options={options}
      variants={variants}
    />
  )
}

export default CollectionProduct
