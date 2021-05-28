import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Grid, Button, Text, Heading, Box, Flex } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
// import tree from '../images/brand/tree.svg'
// import hand from '../images/brand/hand.svg'
// import peace from '../images/brand/peace.svg'
// import leaf from '../images/brand/leaf.svg'

const StatementBox = ({ title, subtitle }) => (
  <Box as="section" sx={{ textAlign: 'center' }}>
    <Heading as="h4" pb={3} sx={{ fontSize: 5, letterSpacing: 'wider' }}>
      {title}
    </Heading>
    <Text sx={{ fontSize: 1, letterSpacing: 'caps' }}>{subtitle}</Text>
  </Box>
)
StatementBox.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

const BrandStatement = () => {
  const data = useStaticQuery(graphql`
    {
      image1: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-01.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 140, layout: CONSTRAINED)
        }
      }
      image2: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-02.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 140, layout: CONSTRAINED)
        }
      }
      image3: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-03.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 140, layout: CONSTRAINED)
        }
      }
      image4: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-04.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 140, layout: CONSTRAINED)
        }
      }
    }
  `)

  return (
    <Box variant="sectionWrap">
      <Grid
        sx={{
          gap: 4,
          gridAutoFlow: ['row', 'column'],
          gridTemplateColumns: ['1fr', '1fr max-content 1fr'],
        }}
      >
        <StatementBox
          title="conviction"
          subtitle="we believe life's moments are a legacy"
        />
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ fontSize: 4, fontFamily: 'heading' }}>&amp;</Box>
        </Box>
        <StatementBox
          title="purpose"
          subtitle="we exist to ensure they live on"
        />
      </Grid>
      <Flex sx={{ justifyContent: 'center' }} py={7}>
        <Button
          variant="primary"
          sx={{ px: 5 }}
          as={Link}
          to="/pages/the-bluboho-origin-story"
        >
          Learn More About Us
        </Button>
      </Flex>
      <Grid
        sx={{
          gridAutoFlow: 'column',
          gap: 4,
          columnWidth: '1fr',
          justifyItems: 'center',
        }}
      >
        <div>
          <GatsbyImage
            image={data.image1.childImageSharp.gatsbyImageData}
            alt="Made in Canada"
          />
        </div>
        <div>
          <GatsbyImage
            image={data.image2.childImageSharp.gatsbyImageData}
            alt="Hand Crafted"
          />
        </div>
        <div>
          <GatsbyImage
            image={data.image3.childImageSharp.gatsbyImageData}
            alt="Ethically Sourced"
          />
        </div>
        <div>
          <GatsbyImage
            image={data.image4.childImageSharp.gatsbyImageData}
            alt="Recycled Metals"
          />
        </div>
      </Grid>
    </Box>
  )
}

export default BrandStatement
