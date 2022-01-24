import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import { wrap } from '@popmotion/popcorn'
import useInterval from '../../lib/useInterval'
import { HeroOuter } from '../content/Hero'

const Toggle = ({ children, isVisible }) =>
  isVisible && (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
    >
      {children}
    </motion.div>
  )

// Announcement.propTypes = {
//   text: PropTypes.string.isRequired,
//   to: PropTypes.string,
//   isVisible: PropTypes.bool.isRequired,
// }
// Announcement.defaultProps = {
//   to: '',
// }

const HeroToggle = ({ heros }) => {
  const delay = 5000 // 5 seconds
  const { length } = heros
  const [isPaused, setIsPaused] = useState(false)
  const [current, setCurrent] = useState(0)

  useInterval(
    () => {
      // setCurrent(curr => {
      //   if (curr + 1 >= heros.length) {
      //     return 0
      //   }
      //   return curr + 1
      // })
      const next = wrap(0, length, current + 1)
      setCurrent(next)
    },
    isPaused ? null : delay
  )

  return (
    <AnimatePresence>
      {[...heros, ...heros, ...heros, ...heros].map((hero, i) => (
        <Toggle key={`hero-${i}`} isVisible={current === i}>
          <HeroOuter data={hero} align="left">
            <GatsbyImage
              image={hero.image1.asset.gatsbyImageData}
              alt={hero.heading}
            />
          </HeroOuter>
        </Toggle>
      ))}
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
