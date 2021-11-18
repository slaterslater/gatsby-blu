import React, { useContext } from 'react'
import { Box } from 'theme-ui'
import { ProductContext } from '../ProductContext'
import MobileGallery from '../MobileGallery'

const ProductModalGallery = () => {
  const { product } = useContext(ProductContext)

  return <MobileGallery hasDots={false} media={product.images} />
}
export default ProductModalGallery
