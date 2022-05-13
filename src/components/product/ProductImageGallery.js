import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
import FullscreenGallery from '../FullscreenGallery'
import MobileGallery from './MobileGallery'
import { useProductGalleryMedia } from '../../hooks/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductVideo from './ProductVideo'

const GalleryImage = ({ image }) => (
  <ShopifyGatsbyImage
    image={image}
    getImageProps={{ width: 900 }}
    style={{ aspectRatio: '1' }}
  />
)

const ProductImageGallery = () => {
  const media = useProductGalleryMedia()

  const [{ isOpen, initialPage }, setGalleryState] = useState({
    isOpen: false,
    initialPage: 0,
  })

  if (!media.length) return <Box />

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <FullscreenGallery
            media={media}
            isOpen={isOpen}
            initialPage={initialPage}
            onClose={() => setGalleryState({ isOpen: false, initialPage: 0 })}
          />
        )}
      </AnimatePresence>
      <Box sx={{ display: ['block', 'none', 'none'], width: '100vw' }} mx={-5}>
        <MobileGallery
          media={media}
          onImageClick={i => setGalleryState({ isOpen: true, initialPage: i })}
        />
      </Box>
      <Flex sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            display: ['none', 'grid', 'grid'],
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gridGap: 4,
          }}
        >
          {media.map((mediaType, i) => (
            <Button
              type="button"
              variant="unset"
              key={mediaType.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => setGalleryState({ isOpen: true, initialPage: i })}
            >
              {mediaType.__typename === 'Image' && (
                <GalleryImage image={mediaType} />
              )}
              {mediaType.__typename === 'Video' && (
                <ProductVideo video={mediaType} />
              )}
            </Button>
          ))}
        </Box>
      </Flex>
    </>
  )
}

export default ProductImageGallery
