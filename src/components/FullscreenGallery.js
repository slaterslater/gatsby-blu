import { AnimatePresence, motion } from 'framer-motion'
import { Flex, IconButton, Grid, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi'
import React, { useEffect, useRef, useState } from 'react'
import RemoteShopifyImage from './RemoteShopifyImage'
import FluidShopifyImage from './FluidShopifyImage'

const MotionBox = motion(Box)
const MotionButton = motion(IconButton)
const MotionFlex = motion(Flex)

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

const Video = ({ media }) => {
  const videoElement = useRef()

  const toggleVideoPlayback = () => {
    const video = videoElement.current
    if (video.classList.contains('playing')) {
      video.pause()
      video.classList.toggle('playing')
    } else {
      video.play()
      video.classList.toggle('playing')
    }
  }

  useEffect(() => {
    videoElement.current.play()
    videoElement.current.classList.toggle('playing')
  }, [media])

  return (
    <Box
      as="video"
      sx={{ width: '100%' }}
      loop
      muted
      onClick={toggleVideoPlayback}
      ref={videoElement}
    >
      {media.sources.map(({ url, format }, i) => (
        <source key={`source-${i}`} src={url} type={`video/${format}`} />
      ))}
    </Box>
  )
}

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
        height: 'calc(var(--vh, 1vh) * 100)',
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
          {media[currentPage].__typename === 'Image' && (
            <RemoteShopifyImage
              originalSrc={media[currentPage].originalSrc}
              sx={{ flex: 1, objectFit: 'contain' }}
            />
          )}
          {media[currentPage].__typename === 'Video' && (
            <Video media={media[currentPage]} />
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
