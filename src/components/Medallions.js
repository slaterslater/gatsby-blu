import React from 'react'
import { Text, Box, Flex, Grid } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'

const Medallion = ({ src, title, children }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: 150,
      textAlign: 'center',
    }}
  >
    <Box>{children}</Box>
    {/* <Text variant="caps" sx={{ whiteSpace: 'nowrap' }}>
      {title}
    </Text> */}
  </Box>
)

const Mediallions = () => (
  <Flex sx={{ justifyContent: 'center' }}>
    <Box
      sx={{
        display: 'inline-grid',
        gridTemplateColumns: ['1fr 1fr', 'repeat(4, 1fr)'],
        justifyItems: 'center',
        gap: 7,
      }}
    >
      <Medallion title="Hand Crafted">
        <StaticImage
          src="../images/home/medallions/hand-crafted.png"
          alt="Hand Crafted Medallion"
        />
      </Medallion>
      <Medallion title="Ethically Sourced">
        <StaticImage
          src="../images/home/medallions/ethically-sourced.png"
          alt="Ethically Sourced Medallion"
        />
      </Medallion>
      <Medallion title="Recycled Materials">
        <StaticImage
          src="../images/home/medallions/recycled-materials.png"
          alt="Recycled Materials Medallion"
        />
      </Medallion>
      <Medallion>
        <StaticImage
          src="../images/home/medallions/made-in-canada.png"
          alt="Made in Canada Medallion"
        />
      </Medallion>
    </Box>
  </Flex>
)

export default Mediallions
