import React from 'react'
import { Link } from 'gatsby'
import { Box, Button, Text } from 'theme-ui'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

const CollectionSlide = ({ title, to, buttonLabel, fluid }) => {
  const toPath = to || `/shop/${title?.toLowerCase()}`

  return (
    <Box pr={4}>
      <Box sx={{ pointerEvents: 'none' }}>
        <GatsbyImage image={fluid} />
      </Box>
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
  );
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

export default CollectionSlide
