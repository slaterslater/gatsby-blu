import React, { useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { useFormattedPrice } from '../hooks/utils'
import ProductListItem from './product/ListItem'

const SearchProduct = ({ product, images }) => {
  const { currencyCode } = useContext(CurrencyContext)
  const [firstImage, secondImage] = images
  const hasRange = product.presentmentPriceRanges.edges.find(
    ({ node }) => node.maxVariantPrice.amount !== node.minVariantPrice.amount
  )

  const presentmentPrice = product.presentmentPriceRanges.edges.find(
    ({ node }) => node.minVariantPrice.currencyCode === currencyCode
  )

  const formattedPrice = useFormattedPrice(
    presentmentPrice?.node.minVariantPrice || { amount: 0 }
  )
  // console.log(formattedPrice)

  return (
    <ProductListItem
      title={product.title}
      to={`/products/${product.handle}`}
      firstImage={firstImage}
      secondImage={secondImage}
      price={formattedPrice}
      hasRange={hasRange}
    />
  )
}

export default SearchProduct
