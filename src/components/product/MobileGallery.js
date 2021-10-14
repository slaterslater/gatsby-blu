// adapted from https://codesandbox.io/s/pqvx3?file=/src/Example.tsx:838-977

import { Flex, AspectRatio, Box, IconButton } from 'theme-ui'
import React, { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { GatsbyImage } from 'gatsby-plugin-image'

import { getShopifyImage } from '../../lib/get-shopify-image'

const MotionBox = motion(Box)
const Dot = ({ full, ...props }) => (
  <MotionBox
    sx={{
      height: 12,
      width: 12,
      border: '2px solid',
      borderColor: 'currentColor',
      borderRadius: '50%',
      bg: full ? 'currentColor' : 'transparent',
    }}
    {...props}
  />
)

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const MobileGallery = ({ images, hasDots = true, onImageClic }) => {
  const [[currentPage, direction], setCurrentPage] = useState([0, 0])

  if (!images[0]) return false
  const imageIndex = wrap(0, images.length, currentPage)

  const paginate = newDirection => {
    setCurrentPage([currentPage + newDirection, newDirection])
  }

  const paginateTo = index => {
    setCurrentPage([index, index > currentPage ? 1 : -1])
  }

  const imageData = useMemo(
    () =>
      getShopifyImage({
        image: images[imageIndex],
      }),
    [imageIndex, JSON.stringify(images[imageIndex])]
  )

  return (
    <Box>
      <AspectRatio ratio={1}>
        <AnimatePresence initial={false}>
          <MotionBox
            key={`mobile-${images[imageIndex].originalSrc}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            onClick={() => onImageClick(imageIndex)}
          >
            <GatsbyImage
              image={imageData}
              alt={images[imageIndex].altText || ''}
            />
          </MotionBox>
        </AnimatePresence>
      </AspectRatio>
      <Flex pt={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          type="button"
          onClick={() => paginate(-1)}
          p={1}
          sx={{ outline: 'none' }}
        >
          <HiChevronLeft size={16} />
        </IconButton>
        {hasDots && (
          <Box mx={2}>
            <Flex>
              {Array(images.length)
                .fill()
                .map((_, i) => (
                  <Dot
                    key={`dot-${i}`}
                    full={i === imageIndex}
                    onClick={() => paginateTo(i)}
                    m={1}
                  />
                ))}
            </Flex>
          </Box>
        )}
        <IconButton
          type="button"
          onClick={() => paginate(1)}
          p={1}
          sx={{ outline: 'none' }}
        >
          <HiChevronRight size={16} />
        </IconButton>
      </Flex>
    </Box>
  )
}

MobileGallery.defaultProps = {
  hasDots: false,
  onImageClick: () => {},
}

export default MobileGallery
