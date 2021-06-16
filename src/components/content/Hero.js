import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import sanityConfig from '../../lib/sanityConfig'

const Hero = ({ node }) => {
  const { image1, image2, mobileImage, heading, subheading, button } = node

  const maybeImages = {}
  maybeImages.image1 = getGatsbyImageData(image1, {}, sanityConfig)
  maybeImages.image2 = image2
    ? getGatsbyImageData(image2, {}, sanityConfig)
    : null
  maybeImages.mobileImage = mobileImage
    ? getGatsbyImageData(mobileImage, {}, sanityConfig)
    : null
  maybeImages.images = mobileImage
    ? withArtDirection(maybeImages.image1, [
        {
          media: '(max-width: 40em)',
          image: maybeImages.mobileImage,
        },
      ])
    : null

  return (
    <Grid sx={{ height: '75vh', bg: 'cream', position: 'relative', zIndex: 1 }}>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', maybeImages.image2 ? '1fr 1fr' : '1fr'],
          gap: 0,
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          overflow: 'hidden',
        }}
      >
        <GatsbyImage image={maybeImages.images || maybeImages.image1} alt="" />
        {maybeImages.image2 && (
          <Box sx={{ display: ['none', 'flex'], alignItems: 'stretch' }}>
            <GatsbyImage image={maybeImages.image2} />
          </Box>
        )}
      </Grid>
      <Flex
        sx={{
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          zIndex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box p={6} sx={{ textAlign: 'center' }}>
          <Heading
            as="h1"
            sx={{
              color: 'white',
              fontSize: 6,
              letterSpacing: 'caps',
              pb: 3,
              lineHeight: 1,
              textTransform: 'lowercase',
            }}
          >
            {heading}
          </Heading>
          <Text
            as="h2"
            variant="caps"
            sx={{ color: 'white', fontSize: 1, pb: 6, lineHeight: 1.2 }}
          >
            {subheading}
          </Text>
          <Button variant="secondary" as={GatsbyLink} to={button.buttonPath}>
            {button.buttonText}
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Hero
