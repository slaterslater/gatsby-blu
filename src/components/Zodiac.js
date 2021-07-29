import { StaticImage } from 'gatsby-plugin-image'
import { Flex, Heading, Text, Container, Box } from 'theme-ui'
import React from 'react'
import ThemeLink from './app/ThemeLink'

const Zodiac = props => (
  <Container variant="full" sx={{ bg: 'cream' }}>
    <Flex sx={{ height: [450, 600] }}>
      <StaticImage
        src="../images/homepage-jul-22/zodiac.jpg"
        objectFit="contain"
      />
    </Flex>
    <Box sx={{ textAlign: 'center' }}>
      <Heading variant="h1" pb={5}>
        Zodiac: Leo
      </Heading>
      <Text as="p">
        <ThemeLink
          variant="caps"
          sx={{ fontSize: 1, textDecoration: 'underline' }}
          to="/collections/leo-gift-guide-1"
        >
          Shop Now
        </ThemeLink>
      </Text>
    </Box>
  </Container>
)

export default Zodiac
