import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'

export const useProductPrice = product => {
  const hasRange =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount

  const minVariant = product.variants.find(
    variant =>
      variant.priceV2.currencyCode ===
        product.priceRange.minVariantPrice.currencyCode &&
      variant.priceV2.amount === product.priceRange.minVariantPrice.amount
  )

  return [minVariant.priceV2, hasRange]
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

  return (
    <ProductListItem
      to={`/products/${product.handle}`}
      linkState={{ collectionTitle, collectionPath }}
      hasRange={hasRange}
      price={price}
      title={title}
      firstImage={firstImage}
      secondImage={secondImage}
      tags={product.tags}
      availableForSale={product.availableForSale}
    />
  )
}

export default CollectionProduct
