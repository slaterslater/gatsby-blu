import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import { wrap } from '@popmotion/popcorn'
import useInterval from '../../lib/useInterval'
import { HeroOuter } from '../content/Hero'

const MotionBox = motion(Box)

const HeroToggle = ({ heros, delay = 6000 }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [current, setCurrent] = useState(0)
  const { heading, subheading, button, image1, imageMobile } = heros[current]

  const [image1Data, mobileImageData] = [image1, imageMobile].map(
    img => img?.asset.gatsbyImageData
  )

  const artDirectedImages = mobileImageData
    ? withArtDirection(image1Data, [
        {
          media: '(max-width: 40em)',
          image: mobileImageData,
        },
      ])
    : image1Data

  useInterval(
    () => {
      const next = wrap(0, heros.length, current + 1)
      setCurrent(next)
    },
    isPaused ? null : delay
  )

  return (
    <AnimatePresence>
      <HeroOuter data={{ heading, subheading, button }} align="left">
        <MotionBox
          key={`toggle-hero-${current}`}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{
            opacity: { duration: 1.5 },
            ease: 'easeInOut',
          }}
          sx={{ backgroundColor: 'cream' }}
        >
          <Grid
            sx={{
              gridTemplateColumns: '1fr',
              gap: 0,
              overflow: 'hidden',
              maxHeight: 600,
              height: '100%',
            }}
          >
            <GatsbyImage
              image={artDirectedImages}
              alt=""
              style={{ overflow: 'hidden', maxHeight: 600, height: '100%' }}
            />
          </Grid>
        </MotionBox>
      </HeroOuter>
    </AnimatePresence>
  )
}

HeroToggle.propTypes = {
  heros: PropTypes.arrayOf(PropTypes.object),
  delay: PropTypes.number,
}

export default HeroToggle
