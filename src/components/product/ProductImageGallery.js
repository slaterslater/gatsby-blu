import React, { useContext, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flex, Box, Button } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IoPlayOutline } from 'react-icons/io5'
import FullscreenGallery from '../FullscreenGallery'
import MobileGallery from './MobileGallery'
import {
  useProductGalleryImages,
  useProductGalleryVideos,
} from '../../hooks/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'

const GalleryImage = ({ image }) => (
  <ShopifyGatsbyImage image={image} getImageProps={{ width: 900 }} />
)

const GalleryVideo = ({ video }) => (
  <>
    <Box
      as={IoPlayOutline}
      size={80}
      sx={{
        position: 'relative',
        marginTop: '-25%',
        top: '60%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'darkerGray',
      }}
    />
    <Box as="video" sx={{ width: '100%' }} loop muted>
      {video.sources.map(({ url, format }, i) => (
        <source key={`source-${i}`} src={url} type={`video/${format}`} />
      ))}
    </Box>
  </>
)

const ProductImageGallery = () => {
  const images = useProductGalleryImages()
  const videos = useProductGalleryVideos()
  const media = images.concat(videos)
  console.log(media)

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
      <Flex>
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
                <GalleryVideo video={mediaType} />
              )}
            </Button>
          ))}
        </Box>
      </Flex>
    </>
  )
}

export default ProductImageGallery
