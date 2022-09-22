import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import PropTypes from 'prop-types'
import { useShopifyImage } from '../hooks/shopifyImage'

const ShopifyGatsbyImage = ({
  image,
  getImageProps = { width: null },
  gatsbyImageProps = {},
  style = {},
}) => {
  const imageData = useShopifyImage({ image, width: getImageProps.width })

  return (
    <GatsbyImage
      image={imageData}
      alt={image.altText || ''}
      style={style}
      {...gatsbyImageProps}
    />
  )
}

ShopifyGatsbyImage.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    altText: PropTypes.string,
    id: PropTypes.string.isRequired,
  }),
  getImageProps: PropTypes.shape({
    width: PropTypes.number,
  }),
  gatsbyImageProps: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

export default ShopifyGatsbyImage
