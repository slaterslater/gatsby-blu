import { AnimatePresence, motion } from 'framer-motion'
import { Flex, IconButton, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import RemoteShopifyImage from './RemoteShopifyImage'
// import FluidShopifyImage from './FluidShopifyImage'
import ProductVideo from './product/ProductVideo'
import ShopifyGatsbyImage from './ShopifyGatsbyImage'

const MotionBox = motion.create(Box)
const MotionButton = motion.create(IconButton)
const MotionFlex = motion.create(Flex)

const ControlButton = props => (
  <MotionButton
    type="button"
    sx={{
      border: '1px solid',
      borderColor: 'border',
      borderRadius: '100%',
      bg: 'white',
      height: 48,
      width: 48,
      outline: 'none',
    }}
    whileHover={{ scale: 1.1 }}
    {...props}
  />
)

const FullscreenGallery = ({ isOpen, initialPage, onClose, media }) => {
  const [[currentPage, direction], setCurrentPage] = useState([
    initialPage || 0,
    0,
  ])

  const paginate = newDirection => {
    setCurrentPage([currentPage + newDirection, newDirection])
  }

  useEffect(() => {
    setCurrentPage([initialPage, 0])
  }, [initialPage])

  const mediaType = media[currentPage]

  return (
    <MotionBox
      initial={{
        opacity: 0,
        y: -7,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      sx={{
        bg: 'white',
        height: '100vh',
        // height: 'calc(var(--vh, 1vh) * 100)',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 12,
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <MotionFlex
          key={currentPage}
          custom={direction}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{}}
          sx={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
          }}
        >
          {mediaType.mediaContentType === 'IMAGE' && (
            // <RemoteShopifyImage
            //   url={media[currentPage].image.src}
            //   sx={{ flex: 1, objectFit: 'contain' }}
            // />
            <ShopifyGatsbyImage
                image={mediaType.image}
                getImageProps={{ width: 900 }}
                // style={{ aspectRatio: '1' }}
              />
          )}
          {media[currentPage].mediaContentType === 'VIDEO' && (
            <ProductVideo video={media[currentPage]} enableTogglePlayback />
          )}
        </MotionFlex>
      </AnimatePresence>
      <Flex
        sx={{
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        p={6}
        pb={8}
      >
        <Box sx={{ width: 80, textAlign: 'center' }}>
          {!!currentPage && (
            <ControlButton onClick={() => paginate(-1)}>
              <HiChevronLeft size={24} />
            </ControlButton>
          )}
        </Box>
        <Box sx={{ width: 80, textAlign: 'center' }}>
          <ControlButton onClick={onClose}>
            <HiX size={24} />
          </ControlButton>
        </Box>
        <Box sx={{ width: 80, textAlign: 'center' }}>
          {currentPage + 1 < media.length && (
            <ControlButton onClick={() => paginate(1)}>
              <HiChevronRight size={24} />
            </ControlButton>
          )}
        </Box>
      </Flex>
    </MotionBox>
  )
}

FullscreenGallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onPageUpdate: PropTypes.func.isRequired,
}

export default FullscreenGallery
