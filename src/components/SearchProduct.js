import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'

const SearchProduct = ({ product, images }) => {
  const [firstImage, secondImage] = images
  const { handle, priceRangeV2, tags, availableForSale } = product
  const title = useProductTitle(product.title)
  const hasRange =
    priceRangeV2.maxVariantPrice.amount !== priceRangeV2.minVariantPrice.amount

  return (
    <ProductListItem
      title={title}
      to={`/products/${handle}`}
      firstImage={firstImage}
      secondImage={secondImage}
      price={priceRangeV2.minVariantPrice}
      hasRange={hasRange}
      tags={tags}
      availableForSale={availableForSale}
    />
  )
}

export default SearchProduct
