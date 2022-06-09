import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Flex, Box } from 'theme-ui'
import PropTypes from 'prop-types'

const ProductBadges = ({ badges }) => {
  if (!badges.length) return <></>
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      {badges.map(({ id, name, image }) => (
        <Box key={id} mx={[3, 1, 2]}>
          <GatsbyImage
            image={image.asset.gatsbyImageData}
            alt=""
            title={name}
          />
        </Box>
      ))}
    </Flex>
  )
}

export default ProductBadges

ProductBadges.propTypes = {
  badges: PropTypes.object,
}
