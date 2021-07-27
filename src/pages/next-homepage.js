import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Container, Text, Box } from 'theme-ui'
import Layout from '../components/layout'

import SEO from '../components/seo'
import HomepageReviews from '../components/HomepageReviews'
import SanityContent from '../components/SanityContent'
import BrandStatement from '../components/BrandStatement'
import CollectionSpotlight, {
  CollectionSpotlightCard,
} from '../components/CollectionSpotlight'
import { HeroOuter } from '../components/content/Hero'

const IndexPage = ({ data }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = data

  const websiteLdJSON = `
  {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "${siteUrl}",
      "about" : {
        "@type":"Thing",
        "name":"Jewelry Store"
      },
      "potentialAction": {
          "@type": "SearchAction",
          "target": "${siteUrl}/search?q={query}&type=product",
          "query-input": "required name=query"
      }
  }
`

  return (
    <Layout>
      <SEO title="Home">
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <SanityContent rawContent={data.sanityPage._rawContent} />
      <BrandStatement />
      <CollectionSpotlight />
      <HomepageReviews />
      <HeroOuter
        heading="most gifted"
        subheading="discover the pieces you love to gift"
        button={{ text: 'shop gifts', path: '/collections/top-gifts' }}
        align="left"
      >
        <StaticImage src="../images/homepage-jul-22/most-gifted.jpg" alt="" />
      </HeroOuter>
      <Container
        variant="full"
        sx={{ bg: 'cream' }}
        pb={[0, 0, 0, 0]}
        mb={[5, 6, 7, 8]}
      >
        <Box sx={{ maxWidth: 680 }} mx="auto">
          <CollectionSpotlightCard
            title="Zodiac: Leo"
            path="/collections/leo-gift-guide-1"
          >
            <StaticImage
              src="../images/homepage-jul-22/zodiac-placeholder.jpg"
              alt=""
            />
          </CollectionSpotlightCard>
        </Box>
      </Container>
      <Container variant="wide">
        <Box
          sx={{
            display: 'inline-grid',
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)'],
            gap: [4, 5, 6],
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <StaticImage
              src="../images/homepage-jul-22/handcrafted.png"
              alt=""
            />
            <Text variant="caps">Hand Crafted</Text>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <StaticImage
              src="../images/homepage-jul-22/ethically_sourced.png"
              alt=""
            />
            <Text variant="caps">Ethically Sourced</Text>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <StaticImage src="../images/homepage-jul-22/recycle.png" alt="" />
            <Text variant="caps">Recycled Materials</Text>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <StaticImage src="../images/homepage-jul-22/local.png" alt="" />
            <Text variant="caps">Made in Canada</Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    sanityPage(title: { eq: "Next Home" }) {
      title
      _rawContent
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
