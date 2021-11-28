import React from 'react'
import { Link, Flex, Box, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  IoIosAddCircleOutline as Open,
  IoIosCloseCircleOutline as Close,
} from 'react-icons/io'

const GiftBox = ({ box, index }) => {
  console.log({ box })
  const [sm, md, lg] = [305, 370, 440]
  const height = [
    [sm, md, lg],
    [lg, md, lg],
    [md, sm, md],
  ]
  return (
    <Flex
      sx={{
        width: ['100%', '50%'],
        flexDirection: 'row',
        order: index,
      }}
    >
      {box.products.map(({ productImage }) => (
        <Flex
          p={3}
          sx={{
            flexWrap: 'wrap',
            flexDirection: 'column',
            height: height[index],
            width: `calc(100% / ${box.products.length})`,
          }}
        >
          <Flex sx={{ minWidth: '100%', height: 0, zIndex: 2 }}>
            <Box
              as={Open}
              mt={[3, 4]}
              mr={[3, 4]}
              ml="auto"
              sx={{ color: index === 1 ? 'black' : 'white' }}
              size={32}
            />
          </Flex>
          <GatsbyImage
            image={productImage.image.asset.gatsbyImageData}
            alt=""
            objectFit="cover"
            style={{ flex: 1 }}
          />
        </Flex>
      ))}
    </Flex>
  )
}

export default GiftBox

GiftBox.propTypes = {
  box: PropTypes.any,
  index: PropTypes.number,
}
