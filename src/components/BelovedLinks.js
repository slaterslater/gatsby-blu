import { graphql, Link, useStaticQuery } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import React from 'react'
import { Box, Button, Flex, Grid, Heading } from 'theme-ui'

const BigLink = ({ fluid, title, buttonLabel, to, alt }) => (
  <Box>
    <Heading
      as="h3"
      variant="lightCaps"
      sx={{ fontSize: 2, textAlign: 'center' }}
      pb={4}
    >
      {title}
    </Heading>
    <Grid>
      <Box sx={{ gridRow: '1 / -1', gridColumn: '1 / -1' }}>
        <GatsbyImage fluid={fluid} alt="" />
      </Box>
      <Flex
        p={3}
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'stretch',
          gridRow: '1 / -1',
          gridColumn: '1 / -1',
          zIndex: 1,
        }}
      >
        <Button as={Link} to={to} variant="secondary" sx={{ flex: 1 }}>
          {buttonLabel}
        </Button>
      </Flex>
    </Grid>
  </Box>
)

const BelovedLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      engagementImage: file(
        relativePath: { eq: "beloved/engagement-rings.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      weddingImage: file(relativePath: { eq: "beloved/wedding-bands.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Box variant="sectionWrap">
      <Grid
        sx={{
          gap: 5,
          gridTemplateColumns: ['1fr', 'repeat(auto-fill, minmax(420px, 1fr))'],
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
        }}
      >
        <BigLink
          title="ONE OF A KIND ENGAGEMENT RINGS"
          to="/shop/wedding/engagement"
          buttonLabel="Shop one of a king rings"
          alt="embracing couple"
          fluid={data.engagementImage.childImageSharp.fluid}
        />
        <BigLink
          title="Wedding Bands"
          to="/shop/wedding/engagement"
          buttonLabel="Shop All Wedding Bands"
          alt="embracing couple"
          fluid={data.weddingImage.childImageSharp.fluid}
        />
      </Grid>
    </Box>
  )
}

export default BelovedLinks
