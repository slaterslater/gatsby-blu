// adapted from ElementSlider.js

import { Flex, AspectRatio, Box, IconButton, Image } from 'theme-ui'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const MotionBox = motion(Box)
const Dot = ({ full, ...props }) => (
  <MotionBox
    sx={{
      height: 10,
      width: 10,
      border: '1px solid',
      borderColor: 'currentColor',
      borderRadius: '50%',
      bg: full ? 'currentColor' : 'transparent',
      margin: '0 5px',
    }}
    {...props}
  />
)

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const GiftProductGallery = ({
  currentIndex,
  length,
  hasDots = true,
  setProductIndex,
  image,
  alt,
}) => {
  const paginate = newDirection => {
    const newIndex = wrap(0, length, currentIndex + newDirection)
    setProductIndex(newIndex)
  }

  return (
    <Box>
      <AspectRatio ratio={1}>
        <AnimatePresence initial={false}>
          <MotionBox
            key={`element-slider-${currentIndex}`}
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
          >
            <Image src={image} alt={alt} />
          </MotionBox>
        </AnimatePresence>
      </AspectRatio>
      {length > 1 && (
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
                {Array(length)
                  .fill()
                  .map((_, i) => (
                    <Dot
                      key={`dot-${i}`}
                      full={i === currentIndex}
                      onClick={() => {}}
                      // onClick={() => paginateTo(i)}
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
      )}
    </Box>
  )
}

export default GiftProductGallery
