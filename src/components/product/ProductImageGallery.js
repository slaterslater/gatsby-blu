import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
import FullscreenGallery from '../FullscreenGallery'
import RemoteShopifyImage from '../RemoteShopifyImage'

const ProductImageGallery = ({ images }) => {
  const [{ isOpen, initialPage }, setGalleryState] = useState({
    isOpen: false,
    initialPage: 0,
  })

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <FullscreenGallery
            images={images}
            isOpen={isOpen}
            initialPage={initialPage}
            onClose={() => setGalleryState({ isOpen: false, initialPage: 0 })}
          />
        )}
      </AnimatePresence>
      <Flex>
        <Box>
          {images.map((image, i) => (
            <Button
              type="button"
              variant="unset"
              onClick={() => setGalleryState({ isOpen: true, initialPage: i })}
            >
              <RemoteShopifyImage
                originalSrc={image.originalSrc}
                altText={image.altText}
                key={image.id}
              />
            </Button>
          ))}
        </Box>
      </Flex>
    </>
  )
}

export default ProductImageGallery
