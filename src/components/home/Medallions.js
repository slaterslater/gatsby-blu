import React from 'react'
import { Flex, Image, Container } from 'theme-ui'

const Medallions = () => (
  <Container sx={{ bg: 'bbBeige', maxWidth: '100%' }}>
    <Flex
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: [400, 580, 680],
      }}
      mx="auto"
    >
      {[
        'ethically-sourced',
        'hand-crafted',
        'made-in-canada',
        'recycled-materials',
      ].map(src => (
        <Image
          key={`medallion=${src}`}
          src={`/medallions/${src}.png`}
          alt={`${src} Medallion`}
          sx={{ width: [75, 100, 125], height: [60, 85, 105] }}
        />
      ))}
    </Flex>
  </Container>
)

export default Medallions
