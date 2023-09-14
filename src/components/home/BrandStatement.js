// import React from 'react'
import { Heading, Text, Box } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'

const BrandStatement = () => (
  <Box
    sx={{
      width: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      zIndex: 1,
      bg: 'cream',
    }}
    // my={6}
    py={7}
    px={6}
    mb={5}
  >
    <Heading as="h2" variant="h1" pb={2}>
      Conviction &amp; Purpose
    </Heading>
    <Text as="p" sx={{ maxWidth: 360 }} pb={4} mx="auto">
      we believe life's moments are a legacy &amp; we exist to ensure they live
      on
    </Text>
    <ThemeLink
      to="/our-origin-story"
      variant="caps"
      aria-label="our origin story"
      sx={{ textDecoration: 'underline' }}
    >
      Read More
    </ThemeLink>
  </Box>
)

export default BrandStatement
