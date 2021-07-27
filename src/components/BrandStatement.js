import React from 'react'
import { Container, Grid, Heading, Text, Box } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'

const BrandStatement = props => (
  <Container variant="narrow">
    <Grid>
      <Box sx={{ textAlign: 'center', gridArea: '1 / 1 / -1 / -1' }}>
        {/* <video */}
        {/*   src="/twinkling_stars.mp4" */}
        {/*   autoplay */}
        {/* /> */}
        <StaticImage
          src="../images/homepage-jul-22/brand_background.png"
          height={160}
          alt=""
        />
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          alignSelf: 'center',
          gridArea: '1 / 1 / -1 / -1',
          zIndex: 1,
        }}
      >
        <Heading as="h3" variant="h1">
          Conviction &amp; Purpose
        </Heading>
        <Text sx={{ fontSize: 1, letterSpacing: 'wider' }}>
          we believe life's moments are a legacy &amp; we exist to ensure they
          live on
        </Text>
      </Box>
    </Grid>
  </Container>
)

export default BrandStatement
