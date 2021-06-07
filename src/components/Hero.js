import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'

const Hero = ({ title, subtitle, button }) => {
  const data = useStaticQuery(graphql`
    {
      desktopImage: file(
        relativePath: { eq: "hero/written-in-the-stars-desktop.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      mobileImage: file(
        relativePath: { eq: "hero/written-in-the-stars-mobile.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  const images = withArtDirection(getImage(data.desktopImage), [
    {
      media: '(max-width: 40em)',
      image: getImage(data.mobileImage),
    },
  ])

  return (
    <Grid sx={{ height: '75vh', bg: 'cream', position: 'relative', zIndex: 1 }}>
      <Grid
        sx={{
          gridAutoFlow: 'column',
          gap: 0,
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          overflow: 'hidden',
        }}
      >
        <GatsbyImage image={images} alt="" />
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
            {title}
          </Heading>
          <Text
            as="h2"
            variant="lightCaps"
            sx={{ color: 'white', fontSize: 1, pb: 6, lineHeight: 1.2 }}
          >
            {subtitle}
          </Text>
          <Button variant="secondary" as={GatsbyLink} to={button.path}>
            {button.label}
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Hero
