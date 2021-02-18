import React from 'react'
import { Box, Text, Heading, Button, Grid } from 'theme-ui'
import { GatsbyLink } from 'gatsby'

const Hero = ({ images, title, subtitle, button }) => (
  <Box>
    <Grid>
      <Box>
        <Heading as="h1">{title}</Heading>
        <Text as="h3">{subtitle}</Text>
        <GatsbyLink as={Button}>button</GatsbyLink>
      </Box>
    </Grid>
  </Box>
)

export default Hero
