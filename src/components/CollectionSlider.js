import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Grid } from 'theme-ui'
import { motion } from 'framer-motion'
import CollectionSlide from './CollectionSlide'
import useSliderConstraint from '../lib/useSliderConstraint'

const AnimatedGrid = motion.custom(Grid)

const CollectionSlider = ({ title, subtitle, slides }) => {
  const ref = useRef(null)
  const sliderConstraints = useSliderConstraint(ref)

  return (
    <Box py={6} pl={[5, 6, 6, 7]}>
      <Box pb={5}>
        <Heading
          as="h2"
          variant="caps"
          pb={2}
          sx={{ fontFamily: 'body', fontWeight: 'light', fontSize: 4 }}
        >
          {title}
        </Heading>
        <Heading
          as="h3"
          sx={{
            fontFamily: 'body',
            letterSpacing: 'wider',
            fontWeight: 'light',
            fontSize: 2,
          }}
        >
          {subtitle}
        </Heading>
      </Box>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <AnimatedGrid
          ref={ref}
          dragConstraints={{
            right: 0,
            left: -sliderConstraints,
          }}
          gap={0}
          drag="x"
          sx={{
            gridAutoColumns: ['60%', '45%', '30%'],
            gridAutoFlow: 'column',
          }}
        >
          {slides.map(slide => (
            <CollectionSlide
              title={slide.title}
              to={slide.to}
              buttonLabel={slide.buttonLabel}
              fluid={slide.fluid}
              key={`slide-${slide.title}`}
            />
          ))}
        </AnimatedGrid>
      </Box>
    </Box>
  )
}

CollectionSlider.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      to: PropTypes.string,
      buttonLabel: PropTypes.string,
      fluid: PropTypes.shape({}),
    })
  ),
}

export default CollectionSlider
