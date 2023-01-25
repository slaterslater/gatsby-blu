import React from 'react'
import { Container, Box, Text, Button, Grid, Divider } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'

const SanityHeroBackground = ({ image1, imageMobile }) => {
  const image1Data = useGatsbySanityImageData(image1, { q: 82 })
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
        gridTemplateColumns: '1fr',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      <GatsbyImage image={artDirectedImages} alt="" />
    </Grid>
  )
}

export const HeroOuter = ({ children, data, align = 'right' }) => {
  const { heading, subheading, button } = data
  return (
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
          right: align === 'right' ? 0 : 'auto',
          zIndex: 1,
          marginTop: '-1px',
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
          {heading && (
            <Text
              variant="h1"
              sx={{
                color: 'white',
                fontSize: 5,
              }}
            >
              {heading}
            </Text>
          )}
        </Box>
        {subheading ? (
          <Text
            as="h2"
            variant="looseSans"
            pb={5}
            sx={{ color: 'white', fontSize: 1, lineHeight: '1.5em' }}
          >
            {subheading}
          </Text>
        ) : (
          <Divider sx={{ borderColor: 'transparent' }} m={0} pb={4} />
        )}
        <Button variant="sketchWhite" as={GatsbyLink} to={button.path}>
          {button.text}
        </Button>
      </Container>
    </Box>
  )
}

const SanityHero = ({ node }) => {
  const { image1, imageMobile, heading, subheading, button } = node

  return (
    <Container variant="full">
      <HeroOuter {...{ heading, subheading, button }}>
        <SanityHeroBackground {...{ image1, imageMobile }} />
      </HeroOuter>
    </Container>
  )
}

export default SanityHero
