import { AnimatePresence, motion } from 'framer-motion'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import React, { useState } from 'react'
import { Box, IconButton, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { PropTypes } from 'prop-types'
import { useTimeout } from '../lib/useTimeout'

const MotionDialogOverlay = motion.create(DialogOverlay)
const MotionDialogContent = motion.create(DialogContent)
const MotionBox = motion.create(Box)

const PopUp = ({ popup, dismissPrompt = () => {}, shouldPrompt = true }) => {
  const { title, path, image, timeout } = popup || {}
  const [isOn, setOn] = useState(false)

  useTimeout(() => {
    if (!shouldPrompt) return
    setOn(true)
  }, timeout * 1000)

  const handleDismiss = () => {
    dismissPrompt()
    setOn(false)
  }

  if (!popup) return null

  return (
    <AnimatePresence>
      {isOn && (
        <MotionDialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onDismiss={handleDismiss}
          style={{
            zIndex: 11,
            background: 'backgroundShade',
            overflow: 'hidden',
          }}
        >
          <MotionBox
            as={MotionDialogContent}
            initial={{ y: '5px', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '20px', opacity: 0 }}
            transition={{ min: 0, max: 100, bounceDamping: 9, delay: '200ms' }}
            aria-label={title}
            m={[0, '10vh auto']}
            mt={['60px', '10vh']}
            mx="auto"
            sx={{
              width: 660,
              maxWidth: ['100%', '90vw'],
              background: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              flexDirection: 'column',
              '.offScreen': { position: 'absolute', left: '-9999em' },
            }}
          >
            <Link as={GatsbyLink} to={path} className="offScreen">
              {title}
            </Link>
            <IconButton
              type="button"
              aria-label="Close"
              onClick={handleDismiss}
              sx={{
                outline: 'none',
                alignSelf: 'flex-end',
                height: 0,
                transform: 'translateY(60px)',
                zIndex: 100,
                svg: {
                  backgroundColor: 'cream',
                  borderRadius: '50%',
                },
              }}
              mr={[2, 6]}
            >
              <IoMdCloseCircleOutline size={24} />
            </IconButton>
            <GatsbyLink to={path}>
              <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
            </GatsbyLink>
          </MotionBox>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
  )
}

PopUp.propTypes = {
  popup: PropTypes.object.isRequired,
  dismissPrompt: PropTypes.func.isRequired,
  shouldPrompt: PropTypes.bool,
}

export default PopUp
