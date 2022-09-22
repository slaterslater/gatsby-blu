import React from 'react'
import { Container, Grid, Heading, Text, Box } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'

const BrandStatement = props => (
  <Container variant="narrow">
    <Grid>
      <Box
        sx={{
          textAlign: 'center',
          alignSelf: 'center',
          gridArea: '1 / 1 / -1 / -1',
          zIndex: 1,
        }}
        py={6}
      >
        <Heading as="h2" variant="h1" pb={2}>
          Conviction &amp; Purpose
        </Heading>
        <Text as="p" sx={{ maxWidth: 360 }} pb={4} mx="auto">
          we believe life's moments are a legacy &amp; we exist to ensure they
          live on
        </Text>
        <ThemeLink
          to="/pages/the-bluboho-origin-story"
          variant="caps"
          aria-label="our origin story"
          sx={{ textDecoration: 'underline' }}
        >
          Read More
        </ThemeLink>
      </Box>
    </Grid>
  </Container>
)

export default BrandStatement
