import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { Grid, Button, Text, Heading, Box, Flex } from 'theme-ui'
import GatsbyImage from 'gatsby-image'
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
    query {
      image1: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-01.jpg" }
      ) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      image2: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-02.jpg" }
      ) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      image3: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-03.jpg" }
      ) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      image4: file(
        relativePath: { eq: "brand-statement/website-icons-FINAL-04.jpg" }
      ) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
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
        <Button variant="primary" sx={{ px: 5 }} as={Link} to="/about">
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
            alt="Made in Canada"
            fixed={data.image1.childImageSharp.fixed}
          />
        </div>
        <div>
          <GatsbyImage
            alt="Hand Crafted"
            fixed={data.image2.childImageSharp.fixed}
          />
        </div>
        <div>
          <GatsbyImage
            alt="Ethically Sourced"
            fixed={data.image3.childImageSharp.fixed}
          />
        </div>
        <div>
          <GatsbyImage
            alt="Recycled Metals"
            fixed={data.image4.childImageSharp.fixed}
          />
        </div>
      </Grid>
    </Box>
  )
}

export default BrandStatement
