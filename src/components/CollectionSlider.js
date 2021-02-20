import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Grid } from 'theme-ui'
import { motion, useMotionValue } from 'framer-motion'
import CollectionSlide from './CollectionSlide'
import { useSlider } from '../lib/useSliderConstraint'

const AnimatedGrid = motion.custom(Grid)

const CollectionSlider = ({ title, subtitle, slides }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const {
    left,
    sliderWidth,
    updatePageMeta,
    hasNextPage,
    hasPrevPage,
    // currentPage,
    // setCurrentPage,
  } = useSlider(ref, x)

  console.log({ hasNextPage, hasPrevPage })

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
      <Grid sx={{ gridAutoFlow: 'column' }}>
        <Button
          type="button"
          onClick={() => {
            const nextXPosition = Math.min(0, x.get() + sliderWidth)
            x.set(nextXPosition)
          }}
        >
          Prev
        </Button>
        <Button
          type="button"
          onClick={() => {
            const nextXPosition = Math.max(left, x.get() - sliderWidth)
            x.set(nextXPosition)
          }}
        >
          Next
        </Button>
      </Grid>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <AnimatedGrid
          ref={ref}
          dragConstraints={{
            right: 0,
            left,
          }}
          gap={0}
          drag="x"
          style={{ x }}
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
