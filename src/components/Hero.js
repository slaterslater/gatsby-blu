import React from 'react'
import { Box, Text, Heading, Button, Grid, Flex } from 'theme-ui'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const Hero = ({ title, subtitle, button }) => {
  const data = useStaticQuery(graphql`
    {
      leftImage: file(relativePath: { eq: "hero/on-body.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      rightImage: file(relativePath: { eq: "hero/ring.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  return (
    <Grid sx={{ height: '70vh', bg: 'cream', position: 'relative', zIndex: 1 }}>
      <Grid
        sx={{
          gridAutoFlow: 'column',
          gap: 0,
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          overflow: 'hidden',
        }}
      >
        <Flex sx={{ height: '70vh' }}>
          <GatsbyImage
            image={data.leftImage.childImageSharp.gatsbyImageData}
            style={{ flex: 1 }}
          />
        </Flex>
        <Flex
          sx={{
            display: ['none', 'flex'],
            height: '70vh',
          }}
        >
          <GatsbyImage
            image={data.rightImage.childImageSharp.gatsbyImageData}
            style={{ flex: 1 }}
          />
        </Flex>
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
        <Box p={5} sx={{ textAlign: 'center' }}>
          <Heading
            as="h1"
            sx={{
              color: 'white',
              fontSize: 6,
              letterSpacing: 'caps',
              pb: 2,
              lineHeight: 1,
            }}
          >
            {title}
          </Heading>
          <Text
            as="h2"
            variant="lightCaps"
            sx={{ color: 'white', fontSize: 1, pb: 5, lineHeight: 1 }}
          >
            {subtitle}
          </Text>
          <Button variant="secondary" as={GatsbyLink} to="/">
            Shop New Beginnings
          </Button>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Hero
