// adapted from src/components/content/CollectionRow.js

import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container, Flex, Box, AspectRatio } from 'theme-ui'
import PropTypes from 'prop-types'
import ThemeLink from '../app/ThemeLink'

export const MobileSlider = ({ nodes, minCardWidth, ...props }) => (
  <Box
    {...props}
    sx={{
      width: 'calc(100% + 24px)',
      overflowX: 'auto',
      webkitOverflowScrolling: 'touch',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      justifyContent: 'center',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      ...(props.sx || {}),
    }}
  >
    <Flex mx={-2} px={5}>
      {nodes.map((node, i) => (
        <Box
          key={`mobile-slider-${i}`}
          mx={2}
          sx={{
            scrollSnapAlign: 'start',
            minWidth: [minCardWidth, 0],
            flex: 1,
          }}
        >
          {node}
        </Box>
      ))}
    </Flex>
  </Box>
)

const CollectionRowSlider = ({ collections, minCardWidth = 230, ...props }) => (
  <Container variant="wide" mt={[5, 6, 7, 8]}>
    <MobileSlider
      minCardWidth={minCardWidth}
      nodes={collections.map(({ image, title, handle }) => (
        <Box sx={{ textAlign: 'center' }} key={`collection-${handle}`}>
          <ThemeLink
            variant="caps"
            sx={{ fontSize: 0 }}
            to={`collections/${handle}`}
          >
            <AspectRatio
              ratio={3 / 4}
              sx={{ overflow: 'hidden', display: 'flex' }}
            >
              <GatsbyImage
                image={image.asset.gatsbyImageData}
                alt=""
                objectFit="cover"
              />
            </AspectRatio>
            <Box py={1} />
            {`shop ${title}`}
          </ThemeLink>
        </Box>
      ))}
    />
  </Container>
)

export default CollectionRowSlider

MobileSlider.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
  minCardWidth: PropTypes.number,
}

CollectionRowSlider.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
  minCardWidth: PropTypes.number,
}
