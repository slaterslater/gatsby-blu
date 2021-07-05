import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'

const Hero = ({ node }) => {
  const { image1, image2, imageMobile, heading, subheading, button } = node

  const image1Data = useGatsbySanityImageData(image1, { q: 82 })
  const image2Data = useGatsbySanityImageData(image2, { q: 82 })
  const mobileImageData = useGatsbySanityImageData(imageMobile, { q: 82 })

  const artDirectedImages = mobileImageData
    ? withArtDirection(image1Data, [
        {
          media: '(max-width: 40em)',
          image: mobileImageData,
        },
      ])
    : image1Data

  return (
    <Grid sx={{ height: '75vh', bg: 'cream', position: 'relative', zIndex: 1 }}>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', image2Data ? '1fr 1fr' : '1fr'],
          gap: 0,
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          overflow: 'hidden',
        }}
      >
        <GatsbyImage image={artDirectedImages} alt="" />
        {image2Data && (
          <Box sx={{ display: ['none', 'flex'], alignItems: 'stretch' }}>
            <GatsbyImage image={image2Data} alt="" />
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
          {heading && (
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
          )}
          {subheading && (
            <Text
              as="h2"
              variant="caps"
              sx={{ color: 'white', fontSize: 1, pb: 6, lineHeight: 1.2 }}
            >
              {subheading}
            </Text>
          )}
          <Button variant="secondary" as={GatsbyLink} to={button.path}>
            {button.text}
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Hero
