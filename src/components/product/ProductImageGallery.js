import React from 'react'
import { Flex, Box } from 'theme-ui'
import RemoteShopifyImage from '../RemoteShopifyImage'

const ProductImageGallery = ({ images }) => (
  <Flex>
    <Box>
      {images.map(image => (
        <RemoteShopifyImage
          originalSrc={image.originalSrc}
          altText={image.altText}
          key={image.id}
        />
      ))}
    </Box>
  </Flex>
)

export default ProductImageGallery
