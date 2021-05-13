import React, { useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'

const SearchProduct = ({ product, images }) => {
  const { currencyCode } = useContext(CurrencyContext)
  const [firstImage, secondImage] = images

  const title = useProductTitle(product.title)

  const hasRange = product.presentmentPriceRanges.edges.find(
    ({ node }) => node.maxVariantPrice.amount !== node.minVariantPrice.amount
  )

  const presentmentPrice = product.presentmentPriceRanges.edges.find(
    ({ node }) => node.minVariantPrice.currencyCode === currencyCode
  )

  return (
    <ProductListItem
      title={title}
      to={`/products/${product.handle}`}
      firstImage={firstImage}
      secondImage={secondImage}
      price={presentmentPrice.node.minVariantPrice}
      hasRange={hasRange}
      tags={product.tags}
      availableForSale={product.availableForSale}
    />
  )
}

export default SearchProduct
