import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import { wrap } from '@popmotion/popcorn'
import useInterval from '../../lib/useInterval'
import { HeroOuter } from '../content/Hero'

const MotionBox = motion(Box)

const HeroToggle = ({ heros, delay = 6000 }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [current, setCurrent] = useState(0)
  const hero = heros[current]

  useInterval(
    () => {
      const next = wrap(0, heros.length, current + 1)
      setCurrent(next)
    },
    isPaused ? null : delay
  )

  return (
    <AnimatePresence>
      <HeroOuter data={hero} align="left">
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
          <GatsbyImage
            image={hero.image1.asset.gatsbyImageData}
            alt={hero.heading}
            style={{ overflow: 'hidden', maxHeight: 600, height: '100%' }}
          />
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
