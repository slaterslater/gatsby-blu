import React from 'react'
import { Box, Flex, Image, Container } from 'theme-ui'
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

const Medallions = () => (
  <Container sx={{ bg: 'bbBeige', maxWidth: '100%' }}>
    <Flex
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: [400, 550, 625],
      }}
      mx="auto"
    >
      {[
        'ethically-sourced',
        'hand-crafted',
        'made-in-canada',
        'recycled-materials',
      ].map(src => (
        <Medallion key={`medallion=${src}`}>
          <Image src={`/medallions/${src}.png`} alt={`${src} Medallion`} />
        </Medallion>
      ))}
    </Flex>
  </Container>
)

export default Medallions

// Medallions.propTypes = {
//   medallions: PropTypes.arrayOf(PropTypes.object),
// }

Medallion.propTypes = {
  children: PropTypes.object,
}
