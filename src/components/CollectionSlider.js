import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Button, Heading, Grid } from 'theme-ui'
import { motion, useMotionValue, useAnimation } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import CollectionSlide from './CollectionSlide'
import { useSlider } from '../lib/useSliderConstraint'

const AnimatedGrid = motion(Grid)

const CollectionSlider = ({ title, subtitle, slides }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  // const controls = useAnimation()
  const { left, goToNextPage, goToPrevPage } = useSlider(ref, x, controls)

  return (
    <Box py={6} pl={[5, 6, 6, 7]}>
      <Flex
        pb={5}
        sx={{ justifyContent: 'space-between', alignContent: 'flex-end' }}
      >
        <Box>
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
        <Flex sx={{ alignItems: 'flex-end' }} pr={3}>
          <Button variant="unset" type="button" onClick={goToPrevPage} mr={2}>
            <FiChevronLeft size={28} />
          </Button>
          <Button variant="unset" type="button" onClick={goToNextPage}>
            <FiChevronRight size={28} />
          </Button>
        </Flex>
      </Flex>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <AnimatedGrid
          ref={ref}
          dragConstraints={{
            right: 0,
            left,
          }}
          gap={0}
          drag="x"
          animate={controls}
          style={{ x }}
          sx={{
            gridAutoColumns: ['60%', '45%', '35%', '28%'],
            gridAutoFlow: 'column',
          }}
        >
          {slides.map(slide => (
            <CollectionSlide
              title={slide.title}
              to={slide.to}
              buttonLabel={slide.buttonLabel}
              image={slide.image}
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
