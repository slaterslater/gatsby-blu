import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Button, Heading, Text } from 'theme-ui'
import GatsbyImage from 'gatsby-image'

const CollectionSlide = ({ title, to, buttonLabel, fluid }) => {
  const toPath = to || `/shop/${title?.toLowerCase()}`

  return (
    <Box sx={{ width: '30%' }}>
      <GatsbyImage fluid={fluid} />
      <Text
        as="h4"
        variant="caps"
        sx={{ fontWeight: 'normal', fontSize: 2 }}
        py={3}
      >
        {title}
      </Text>
      <Button
        variant="primary"
        as={Link}
        to={toPath}
        sx={{ fontSize: 0, py: 2, px: 3 }}
      >
        {buttonLabel}
      </Button>
    </Box>
  )
}

CollectionSlide.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  buttonLabel: PropTypes.string,
}
CollectionSlide.defaultProps = {
  to: null,
  buttonLabel: 'Shop All',
}

const CollectionSlider = ({ title, subtitle, slides }) => (
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
    <Flex>
      {slides.map(slide => (
        <CollectionSlide
          title={slide.title}
          to={slide.to}
          buttonLabel={slide.buttonLabel}
          fluid={slide.fluid}
          key={`slide-${slide.title}`}
        />
      ))}
    </Flex>
  </Box>
)

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
