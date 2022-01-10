import React from 'react'
import { Box, Flex, Container } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'

const Medallion = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: [100, 115, 135],
      textAlign: 'center',
    }}
  >
    <Box>{children}</Box>
  </Box>
)

const Medallions = ({ medallions }) => (
  <Container variant="full" pt={[5, 6, 7, 8]} sx={{ bg: 'bbBeige' }}>
    <Flex sx={{ justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'inline-grid',
          gridTemplateColumns: ['1fr 1fr', 'repeat(4, 1fr)'],
          justifyItems: 'center',
          gap: 7,
        }}
      >
        {medallions.map(({ image, altText }, i) => (
          <Medallion key={`medallion=${i}`}>
            <GatsbyImage
              image={image.asset.gatsbyImageData}
              alt={`${altText} Medallion`}
            />
          </Medallion>
        ))}
      </Box>
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
