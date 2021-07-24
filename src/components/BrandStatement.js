import React from 'react'
import { Grid, Flex, Heading, Text, Box } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'

const BrandStatement = props => (
  <Flex sx={{ justifyContent: 'center ', width: '100%' }} pb={[7, 8]}>
    <Grid sx={{ width: 680, maxWidth: '100%' }} mx={4}>
      <Box sx={{ textAlign: 'center', gridArea: '1 / 1 / -1 / -1' }}>
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
  </Flex>
)

export default BrandStatement
