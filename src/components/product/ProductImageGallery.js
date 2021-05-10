import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import FullscreenGallery from '../FullscreenGallery'
import RemoteShopifyImage from '../RemoteShopifyImage'
import MobileGallery from './MobileGallery'
import { getShopifyImage } from '../../lib/get-shopify-image'

const GalleryImage = ({ image }) => {
  const imageData = getShopifyImage({ image })

  return <GatsbyImage image={imageData} alt={image.altText} />
}

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
      <Box sx={{ display: ['block', 'none', 'none'], width: '100vw' }} mx={-5}>
        <MobileGallery
          images={images}
          onImageClick={i => setGalleryState({ isOpen: true, initialPage: i })}
        />
      </Box>
      <Flex>
        <Box sx={{ display: ['none', 'block', 'block'] }}>
          {images.map((image, i) => (
            <Button
              type="button"
              variant="unset"
              onClick={() => setGalleryState({ isOpen: true, initialPage: i })}
            >
              <GalleryImage image={image} key={image.id} />
            </Button>
          ))}
        </Box>
      </Flex>
    </>
  )
}

export default ProductImageGallery
