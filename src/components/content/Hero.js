import React from 'react'
import { Container, Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'
import OnePercentCallout from './OnePercentCallout'

const SanityHeroBackground = ({ image1, image2, imageMobile }) => {
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

export const HeroOuter = ({
  children,
  iconImage,
  heading,
  subheading,
  align = 'right',
  button,
}) => (
  // const iconImageData = null

  <Box sx={{ position: 'relative' }}>
    <Grid
      sx={{
        height: [450, 600],
        bg: 'cream',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {children}
    </Grid>
    <Container
      variant="wide"
      py={6}
      pt={7}
      sx={{
        bg: ['primary', 'transparent'],
        textAlign: ['center', align || 'right'],
        position: ['relative', 'absolute'],
        bottom: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          position: 'relative',
          flexDirection: ['column', 'row'],
          alignItems: ['middle', 'flex-end'],
        }}
      >
        {iconImage && (
          <Box
            mr={2}
            sx={{
              transform: ['translateY(-78px)', 'none'],
              height: [0, 'auto'],
            }}
          >
            <GatsbyImage image={iconImage} alt="" />
          </Box>
        )}
        {heading && (
          <Heading
            variant="h1"
            as="h1"
            sx={{
              color: 'white',
              fontSize: [6, 7],
            }}
          >
            {heading}
          </Heading>
        )}
      </Box>
      {subheading && (
        <Text
          as="h2"
          variant="looseSans"
          pb={5}
          sx={{ color: 'white', fontSize: 1, lineHeight: '1.5em' }}
        >
          {subheading}
        </Text>
      )}
      <Button variant="sketchWhite" as={GatsbyLink} to={button.path}>
        {button.text}
      </Button>
    </Container>
  </Box>
)

const SanityHero = ({ node }) => {
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
    <Container variant="full">
      <HeroOuter iconImage={iconImageData} {...{ heading, subheading, button }}>
        <SanityHeroBackground {...{ image1, image2, imageMobile }} />
      </HeroOuter>
      <OnePercentCallout />
    </Container>
  )
}

export default SanityHero
