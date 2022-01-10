import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
// import { GatsbyImage } from 'gatsby-plugin-image'
import FullscreenGallery from '../FullscreenGallery'
import MobileGallery from './MobileGallery'
import {
  useProductGalleryImages,
  useProductGalleryVideos,
} from '../../hooks/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductVideo from './ProductVideo'

const GalleryImage = ({ image }) => (
  <ShopifyGatsbyImage image={image} getImageProps={{ width: 900 }} />
)

const ProductImageGallery = () => {
  const images = useProductGalleryImages()
  const videos = useProductGalleryVideos()
  const media = images.concat(videos)

  const [{ isOpen, initialPage }, setGalleryState] = useState({
    isOpen: false,
    initialPage: 0,
  })

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
