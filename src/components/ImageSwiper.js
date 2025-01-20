import React, { useState } from 'react'
import { AspectRatio, Box, Flex } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import useInterval from '../lib/useInterval'

const MotionBox = motion.create(Box)
const Dot = ({ full, ...props }) => (
  <MotionBox
    sx={{
      height: [10, 12, 15],
      width: [10, 12, 15],
      border: '1px solid',
      borderColor: full ? 'cream' : 'bbBackground',
      borderRadius: '50%',
      bg: full ? 'cream' : 'bbBackground',
      margin: '0 5px',
    }}
    {...props}
  />
)

const ImageSwiper = ({ images, delay = 5000 }) => {
  const imagesLength = images.length

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity
  const paginate = () => {}
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useInterval(
    () => {
      const newIndex = currentIndex === imagesLength - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    },
    isPaused ? null : delay
  )

  return (
    <Box
      sx={{ width: ['115%', '100%'], maxWidth: 850 }}
      px={[0, 4, 6]}
      // pt={[5, 0]}
      // mt={[5, 0]}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AspectRatio ratio={4 / 3}>
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
            sx={{
              display: 'flex',
              justifyContent: 'stretch',
              height: '100%',
            }}
          >
            <Flex sx={{ justifyContent: 'stretch', width: '100%' }}>
              {/* <Image
                src={
                  require(`./images-temp/slider/muskoka_blob-0${
                    currentIndex + 1
                  }_rs.png`).default
                }
                alt=""
                sx={{ objectFit: 'cover', flex: 1 }}
              /> */}
              <GatsbyImage
                image={images[currentIndex].asset.gatsbyImageData}
                alt=""
                style={{ objectFit: 'cover', flex: 1 }}
              />
            </Flex>
          </MotionBox>
        </AnimatePresence>
      </AspectRatio>
      {imagesLength > 1 && (
        <Flex
          sx={{
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            width: 150,
          }}
          mt={[-6, -7, -8]}
          mx="auto"
        >
          {Array(imagesLength)
            .fill()
            .map((_, i) => (
              <Dot
                key={`dot-${i}`}
                full={i === currentIndex}
                onClick={() => {
                  setCurrentIndex(i)
                }}
              />
            ))}
        </Flex>
      )}
    </Box>
  )
}

export default ImageSwiper
