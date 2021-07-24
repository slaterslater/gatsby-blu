import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'

const Hero = ({
  desktopImage1,
  desktopImage2,
  mobileImage,
  title,
  subtitle,
  button,
}) => {
  const images = withArtDirection(getImage(desktopImage1), [
    {
      media: '(max-width: 40em)',
      image: getImage(mobileImage),
    },
  ])

  return (
    <Box pb={8}>
      <Grid
        sx={{ height: '75vh', bg: 'cream', position: 'relative', zIndex: 1 }}
      >
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', desktopImage2 ? '1fr 1fr' : '1fr'],
            gap: 0,
            gridColumn: '1 / -1',
            gridRow: '1 / -1',
            overflow: 'hidden',
          }}
        >
          <GatsbyImage image={images} alt="" />
          {desktopImage2 && (
            <Box sx={{ display: ['none', 'flex'], alignItems: 'stretch' }}>
              <GatsbyImage image={getImage(desktopImage2)} />
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
            {title && (
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
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text
                as="h2"
                variant="caps"
                sx={{
                  color: 'white',
                  fontSize: 1,
                  pb: 6,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Text>
            )}
            <Button variant="secondary" as={GatsbyLink} to={button.path}>
              {button.label}
            </Button>
          </Box>
        </Flex>
      </Grid>
      <OnePercentCallout />
    </Box>
  )
}

export default Hero
