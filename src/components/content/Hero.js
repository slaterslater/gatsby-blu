import React from 'react'
import { Container, Box, Text, Grid } from 'theme-ui'
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
    <Box
      as={GatsbyLink}
      to={button.path}
      sx={{ position: 'relative', textDecoration: 'none', color: 'primary' }}
    >
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
      <Text
        bg="bbBackground"
        sx={{
          width: ['calc(100% - 32px)', 'max-content'],
          display: 'block',
          position: 'relative',
          transform: ['translateY(-65px)', 'translateY(-120px)'],
          textAlign: 'center',
          zIndex: 2,
          fontFamily: 'heading',
          textTransform: 'uppercase',
          border: '1px solid',
          borderColor: 'cream',
          borderRadius: 2,
          marginBottom: ['-20px', '-60px'],
          fontSize: 2,
        }}
        mx="auto"
        mb={4}
        px={7}
        py={3}
      >
        {button.text}
      </Text>
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
