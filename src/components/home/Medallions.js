import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Flex, Container } from 'theme-ui'

const Medallions = () => (
  <Container sx={{ bg: 'bbBeige', maxWidth: '100%' }}>
    <Flex
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: [400, 580, 680],
        img: { width: [75, 100, 125], height: 'auto' },
      }}
      mx="auto"
    >
      <StaticImage
        src="../../images/medallions/ethically-sourced.webp"
        alt=""
        placeholder="blurred"
      />
      <StaticImage
        src="../../images/medallions/hand-crafted.webp"
        alt=""
        placeholder="blurred"
      />
      <StaticImage
        src="../../images/medallions/made-in-canada.webp"
        alt=""
        placeholder="blurred"
      />
      <StaticImage
        src="../../images/medallions/recycled-materials.webp"
        alt=""
        placeholder="blurred"
      />
    </Flex>
  </Container>
)

export default Medallions
