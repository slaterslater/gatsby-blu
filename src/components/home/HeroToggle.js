import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import { wrap } from '@popmotion/popcorn'
import useInterval from '../../lib/useInterval'
import { HeroOuter } from '../content/Hero'

const MotionBox = motion(Box)
const heroVariants = {
  initial: {
    opacity: 0.2,
  },
  in: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 1,
      },
    },
  },
  out: {
    opacity: 0.2,
    transition: {
      opacity: {
        duration: 1,
      },
    },
  },
}

const HeroToggle = ({ heros }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [current, setCurrent] = useState(0)
  const hero = heros[current]
  const { length } = heros
  const delay = 5000 // 5 seconds

  useInterval(
    () => {
      const next = wrap(0, length, current + 1)
      setCurrent(next)
    },
    isPaused ? null : delay
  )

  return (
    <AnimatePresence>
      <HeroOuter data={hero} align="left">
        <MotionBox
          key={`toggle-hero-${current}`}
          initial="initial"
          animate="in"
          exit="out"
          variants={heroVariants}
        >
          <GatsbyImage
            image={hero.image1.asset.gatsbyImageData}
            alt={hero.heading}
            style={{ height: '100%' }}
          />
        </MotionBox>
      </HeroOuter>
    </AnimatePresence>
  )
}

HeroToggle.propTypes = {
  // announcements: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     text: PropTypes.string,
  //     to: PropTypes.string,
  //   })
  // ),
}

export default HeroToggle
