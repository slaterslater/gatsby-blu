import React, { useEffect, useState } from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'
import { useMetafieldValue } from '../hooks/useMetafield'
import axios from 'axios'

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
  media,
  badges = [],
  allowQuickAdd,
  showLabel = true,
}) => {
  const [price, hasRange, compareAtPrice] = useProductPrice(product)
  const title = useProductTitle(product.title)
  const [firstImage, secondImage] = media?.map(m => m.image) ?? []
  const { handle, tags, availableForSale, metafields, options, variants } =
    product
  const visitTag = tags.find(tag => tag.startsWith('visit'))?.replace('-', ' ')
  const badge = badges.find(({ name }) => name === visitTag)
  
  const [productIdentifier] = product.id?.match(/\d+$/) || []

  const [rating, setRating] = useState(null)

  useEffect(() => {
    if (!productIdentifier) return 
    const KEY = process.env.GATSBY_YOTPO_APP_KEY
    const url = `https://api-cdn.yotpo.com/products/${KEY}/${productIdentifier}/bottomline`
    
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        const {bottomline} = res.data.response
        if (bottomline.total_reviews === 0) return
        setRating(bottomline);
      } catch (err) {
        console.error({title, err})
      }
    };

    fetchData()
  }, [productIdentifier])

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
      rating={rating}
    />
  )
}

export default CollectionProduct
