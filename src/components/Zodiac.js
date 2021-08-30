import { StaticImage } from 'gatsby-plugin-image'
import { Flex, Heading, Text, Container, Box } from 'theme-ui'
import React from 'react'
import ThemeLink from './app/ThemeLink'

const Zodiac = props => (
  <Container variant="full" sx={{ bg: 'bbBeige' }}>
    <Flex px={[4, 0]} py={[5, 6, 7, 8]} sx={{ height: [450, 600] }}>
      <StaticImage src="../images/zodiac/virgo.jpg" objectFit="contain" />
    </Flex>
    <Box sx={{ textAlign: 'center' }}>
      <Heading variant="h1" pb={5}>
        Zodiac: Virgo
      </Heading>
      <Text as="p">
        <ThemeLink
          variant="caps"
          sx={{ fontSize: 1, textDecoration: 'underline' }}
          to="/collections/virgo-gift-guide"
        >
          Shop Now
        </ThemeLink>
      </Text>
    </Box>
  </Container>
)

export default Zodiac
