import React from 'react'
import { Text, Box, Flex } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'

const Medallion = ({ src, title, children }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: 130,
      textAlign: 'center',
    }}
  >
    <Box>{children}</Box>
    <Text variant="caps" sx={{ whiteSpace: 'nowrap' }}>
      {title}
    </Text>
  </Box>
)

const Mediallions = props => (
  <Flex
    mx="auto"
    sx={{
      flexWrap: ['wrap', 'nowrap'],
      justifyContent: 'center',
      gap: 7,
    }}
  >
    <Medallion title="Hand Crafted">
      <StaticImage src="../images/homepage-jul-22/handcrafted200.png" alt="" />
    </Medallion>
    <Medallion title="Ethically Sourced">
      <StaticImage
        src="../images/homepage-jul-22/ethically_sourced200.png"
        alt=""
      />
    </Medallion>
    <Medallion title="Recycled Materials">
      <StaticImage src="../images/homepage-jul-22/recycle200.png" alt="" />
    </Medallion>
    <Medallion title="Made in Canada">
      <StaticImage src="../images/homepage-jul-22/local200.png" alt="" />
    </Medallion>
  </Flex>
)

export default Mediallions
