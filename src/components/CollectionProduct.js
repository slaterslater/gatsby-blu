import React, { useContext } from 'react'
import { useProductTitle } from './ProductTitle'
import { CurrencyContext } from '../contexts/CurrencyContext'
import ProductListItem from './product/ListItem'

const useProductPrice = product => {
  const { currencyCode } = useContext(CurrencyContext)

  const hasRange =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount
  // is there more than one price?
  //
  //

  // const productPrice = useFormattedPrice({
  //   currency: product.priceRange.minVariantPrice.currencyCode,
  //   amount: product.priceRange.minVariantPrice.amount,
  // })

  const minVariant = product.variants.find(
    variant =>
      variant.priceV2.currencyCode ===
        product.priceRange.minVariantPrice.currencyCode &&
      variant.priceV2.amount === product.priceRange.minVariantPrice.amount
  )

  const variantPresentmentPrice = minVariant.presentmentPrices.edges.find(
    ({ node }) => node.price.currencyCode === currencyCode
  )

  return [variantPresentmentPrice.node.price, hasRange]
}

const CollectionProduct = ({ product, images }) => {
  const [price, hasRange] = useProductPrice(product)
  const title = useProductTitle(product.title)

  const firstImage = images[0]
  const secondImage = images[1]

  return (
    <ProductListItem
      to={`/products/${product.handle}`}
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
