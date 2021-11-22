// adapted from MobileGallery.js

import { Flex, AspectRatio, Box, IconButton } from 'theme-ui'
import React, { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

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

const ElementSlider = ({ elements, hasDots = true, onElemClick }) => {
  const [[currentPage, direction], setCurrentPage] = useState([0, 0])

  if (!elements[0]) return false
  const elemIndex = wrap(0, elements.length, currentPage)

  const paginate = newDirection => {
    setCurrentPage([currentPage + newDirection, newDirection])
  }

  const paginateTo = index => {
    setCurrentPage([index, index > currentPage ? 1 : -1])
  }

  // const imageData = useMemo(
  //   () =>
  //     getShopifyImage({
  //       image: images[imageIndex],
  //     }),
  //   [imageIndex, JSON.stringify(images[imageIndex])]
  // )

  return (
    <Box>
      <AspectRatio ratio={1}>
        <AnimatePresence initial={false}>
          <MotionBox
            key={`element-slider-${elemIndex}`}
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
            onClick={() => onElemClick(elemIndex)}
          >
            {elements[elemIndex]}
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
              {Array(elements.length)
                .fill()
                .map((_, i) => (
                  <Dot
                    key={`dot-${i}`}
                    full={i === elemIndex}
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

ElementSlider.defaultProps = {
  hasDots: false,
  onImageClick: () => {},
}

export default ElementSlider
