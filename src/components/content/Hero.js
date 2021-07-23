import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import {
  GatsbyImage,
  getImage,
  StaticImage,
  withArtDirection,
} from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'
import ContentOuter from './ContentOuter'

const HeroBackground = ({ image1, image2, imageMobile }) => {
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
    <Grid
      sx={{
        gridTemplateColumns: ['1fr', image2Data ? '1fr 1fr' : '1fr'],
        gap: 0,
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
  )
}

const Hero = ({ node }) => {
  const {
    image1,
    image2,
    imageMobile,
    icon,
    heading,
    subheading,
    button,
  } = node

  const iconImageData = useGatsbySanityImageData(icon, { q: 100, height: 60 })

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Grid
          sx={{
            height: [450, 600],
            bg: 'cream',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <HeroBackground {...{ image1, image2, imageMobile }} />
        </Grid>
        <Box
          px={[8, 6, 7, 10]}
          py={[8, 6, 6, 7]}
          sx={{
            bg: ['primary', 'transparent'],
            textAlign: ['center', 'right'],
            position: ['relative', 'absolute'],
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <Flex
            mt={[-9, 0]}
            sx={{
              flexDirection: ['column', 'row'],
              justifyContent: 'flex-end',
              alignItems: 'middle',
            }}
          >
            {iconImageData && (
              <Box mr={2}>
                <GatsbyImage image={iconImageData} alt="" />
              </Box>
            )}

            {heading && (
              <Heading
                variant="h1"
                as="h1"
                mt={[6, 0]}
                sx={{
                  color: 'white',
                  fontSize: [6, 7],
                }}
              >
                {heading}
              </Heading>
            )}
          </Flex>
          {subheading && (
            <Text
              as="h2"
              variant="looseSans"
              pb={5}
              sx={{ color: 'white', fontSize: 1 }}
            >
              {subheading}
            </Text>
          )}
          <Button variant="sketchWhite" as={GatsbyLink} to={button.path}>
            {button.text}
          </Button>
        </Box>
      </Box>
      <Box sx={{ bg: 'cream' }} py={7} mb={8}>
        <Flex sx={{ width: '100%', maxWidth: 680, gap: 6 }} px={4} mx="auto">
          <StaticImage
            src="../../images/one-percent-logo.png"
            alt="one percent logo"
            width={156}
          />
          <Text variant="long">
            we are members of 1% for the Planet, a global network of 4000
            businesses in 90 countries that pledge a minimum of 1% of sales to
            organizations working to find solutions to the environmental crisis.
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default Hero
