import { AnimatePresence, motion } from 'framer-motion'
import { Flex, Button, Grid, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import RemoteShopifyImage from './RemoteShopifyImage'
import FluidShopifyImage from './FluidShopifyImage'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

const ControlButton = props => (
  <MotionButton type="button" whileHover={{ scale: 1.1 }} {...props} />
)

const FullscreenGallery = ({ isOpen, initialPage, onClose, images }) => {
  const [currentPage, setCurrentPage] = useState(initialPage || 0)

  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  return (
    <MotionBox
      sx={{
        bg: 'white',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 12,
      }}
    >
      <Flex
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
        }}
      >
        <RemoteShopifyImage
          originalSrc={images[currentPage].originalSrc}
          sx={{ flex: 1, objectFit: 'contain' }}
        />
      </Flex>
      <Grid
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'center',
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        p={4}
      >
        <Box>
          {!!currentPage && (
            <ControlButton onClick={() => setCurrentPage(currentPage - 1)}>
              back
            </ControlButton>
          )}
        </Box>
        <Box>
          <ControlButton onClick={onClose}>close</ControlButton>
        </Box>
        <Box>
          {currentPage < images.length && (
            <ControlButton onClick={() => setCurrentPage(currentPage + 1)}>
              forward
            </ControlButton>
          )}
        </Box>
      </Grid>
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
