import React from 'react'
import { useProductTitle } from './ProductTitle'
import ProductListItem from './product/ListItem'

const SearchProduct = ({ product, images }) => {
  const [firstImage, secondImage] = images
  const { handle, priceRange, tags, availableForSale } = product
  const title = useProductTitle(product.title)
  const hasRange =
    priceRange.maxVariantPrice.amount !== priceRange.minVariantPrice.amount

  return (
    <ProductListItem
      title={title}
      to={`/products/${handle}`}
      firstImage={firstImage}
      secondImage={secondImage}
      price={priceRange.minVariantPrice}
      hasRange={hasRange}
      tags={tags}
      availableForSale={availableForSale}
    />
  )
}

export default SearchProduct
