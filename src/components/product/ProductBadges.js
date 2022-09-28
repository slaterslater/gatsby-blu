import React, { useContext } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Flex, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { ProductContext } from './ProductContext'

const ProductBadges = () => {
  const { badges } = useContext(ProductContext)
  if (!badges || !badges.length) return <></>
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
  badges: PropTypes.arrayOf(PropTypes.object),
}
