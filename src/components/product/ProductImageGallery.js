import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import FullscreenGallery from '../FullscreenGallery'
import MobileGallery from './MobileGallery'
import { getShopifyImage } from '../../lib/get-shopify-image'

const GalleryImage = ({ image }) => {
  const imageData = getShopifyImage({ image, width: 900 })

  return <GatsbyImage image={imageData} alt={image.altText || ''} />
}

const ProductImageGallery = ({ images }) => {
  const [{ isOpen, initialPage }, setGalleryState] = useState({
    isOpen: false,
    initialPage: 0,
  })

  // add packaging images to all image galleries
  // const imagesWithPackaging = [
  //   ...images,
  //   {
  //     originalSrc:
  //       'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-4.jpg?v=1620925677',
  //     height: 3000,
  //     width: 3000,
  //     altText: 'packaging',
  //     id: 'packaging-id-17757575234566',
  //   },
  //   {
  //     originalSrc:
  //       'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-9.jpg?v=1620925676',
  //     height: 3000,
  //     width: 3000,
  //     altText: 'packaging alternate',
  //     id: 'packaging-alt-id-1234566',
  //   },
  // ]

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
              key={image.id}
              onClick={() => setGalleryState({ isOpen: true, initialPage: i })}
            >
              <GalleryImage image={image} />
            </Button>
          ))}
        </Box>
      </Flex>
    </>
  )
}

export default ProductImageGallery
