import React, { useState } from 'react'
import { Heading, Grid, Box, Text, Container, Flex } from 'theme-ui'
import { BiHeart } from 'react-icons/bi'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import WholesaleForm from '../components/form/WholesaleForm'
import Layout from '../components/layout'
import { CalloutBox } from '../components/product/ProductCTACallout'
import { MobileSlider } from '../components/content/CollectionRow'

const WholesalePage = ({ data }) => {
  const [success, setSuccess] = useState(false)
  const images = data.allFile.nodes.map((image, i) => (
    <GatsbyImage
      key={`images-${i}`}
      image={image.childImageSharp.gatsbyImageData}
      alt=""
      style={{ height: '100%', maxHeight: 450 }}
    />
  ))
  return (
    <Layout
      title="wholesale"
      description="application for bluboho wholesale account"
    >
      <Container as="main" sx={{ textAlign: 'center' }} py={7} px={6}>
        <Heading as="h1" variant="h2" p={[4, 5]}>
          wholesale
        </Heading>
        <Text
          as="p"
          variant="copy"
          sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}
          mx="auto"
          px={2}
          mb={[4, 6]}
        >
          we are accepting a limited number of applicants for wholesale accounts
          in 2022 to carry our bluboho jewelry. each piece is designed by our
          team of creatives. then we lovingly handmake our pieces in toronto
          using recycled metals and ethically sourced stones. let's get to know
          each other… take a minute to fill out the information below and we
          will be in touch. xx
        </Text>
        <Flex
          sx={{
            maxWidth: 965,
            flexDirection: ['column', 'row-reverse'],
          }}
          py={[4, 6]}
          mx="auto"
        >
          <Box sx={{ width: '100%', maxWidth: 490 }}>
            {success ? (
              <CalloutBox
                icon={BiHeart}
                title="Your account application has been submitted!"
                description="We will reach out shortly"
                bg="cream"
              />
            ) : (
              <WholesaleForm onSuccess={() => setSuccess(true)} />
            )}
          </Box>
          <Box
            sx={{ width: [270, '100%'], maxWidth: 475 }}
            pr={[0, 8]}
            mx={['auto', 0]}
            mt={[7, 0]}
          >
            <StaticImage
              src="../images/wholesale/wholesale_bg.jpg"
              transformOptions={{ fit: 'cover', cropFocus: 'attention' }}
              height={400}
              placeholder="blurred"
              style={{ height: '100%', width: '100%', minHeight: 400 }}
              alt=""
            />
          </Box>
        </Flex>
      </Container>
      <Box mb={7}>
        <MobileSlider
          minCardWidth={280}
          sx={{ display: ['block', 'none'], width: '100%' }}
          nodes={images}
          gap={1}
        />
        <Grid
          sx={{
            display: ['none', 'inline-grid'],
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
          }}
        >
          {images}
        </Grid>
      </Box>
    </Layout>
  )
}

export default WholesalePage

export const query = graphql`
query{
  allFile(
    filter: {relativeDirectory: {eq: "wholesale"}, name: {regex: "/wholesale_\\d/"}}
    sort: {order: ASC, fields: name}
  ) {
    nodes {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
  }
}
`
