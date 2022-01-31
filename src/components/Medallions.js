import React from 'react'
import { Box, Flex, Container } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'

const Medallion = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: [75, 100, 125],
      textAlign: 'center',
    }}
  >
    <Box>{children}</Box>
  </Box>
)

const Medallions = ({ medallions }) => (
  <Container sx={{ bg: 'bbBeige' }}>
    <Flex
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: [400, 550, 625],
      }}
      mx="auto"
    >
      {medallions.map(({ image, altText }, i) => (
        <Medallion key={`medallion=${i}`}>
          <GatsbyImage
            image={image.asset.gatsbyImageData}
            alt={`${altText} Medallion`}
          />
        </Medallion>
      ))}
    </Flex>
  </Container>
)

export default Medallions

Medallions.propTypes = {
  medallions: PropTypes.arrayOf(PropTypes.object),
}

Medallion.propTypes = {
  children: PropTypes.object,
}
