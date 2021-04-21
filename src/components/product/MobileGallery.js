// adapted from https://codesandbox.io/s/pqvx3?file=/src/Example.tsx:838-977

import { AspectRatio, Box, Button } from 'theme-ui'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import RemoteShopifyImage from '../RemoteShopifyImage'

const MotionBox = motion(Box)

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const MobileGallery = ({ images, onImageClick }) => {
  const [[currentPage, direction], setCurrentPage] = useState([0, 0])

  const imageIndex = wrap(0, images.length, currentPage)

  const paginate = newDirection => {
    setCurrentPage([currentPage + newDirection, newDirection])
  }

  return (
    <>
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
            <RemoteShopifyImage
              originalSrc={images[imageIndex].originalSrc}
              altText={images[imageIndex].altText}
              sx={{ flex: 1, objectFit: 'contain' }}
            />
          </MotionBox>
        </AnimatePresence>
      </AspectRatio>
      <Box />
    </>
  )
}

export default MobileGallery
