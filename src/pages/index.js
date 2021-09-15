import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Container, Text, Box } from 'theme-ui'
import Layout from '../components/layout'
import OnePercentCallout from '../components/content/OnePercentCallout'

import SEO from '../components/seo'
import HomepageReviews from '../components/HomepageReviews'
import SanityContent from '../components/SanityContent'
import BrandStatement from '../components/BrandStatement'
import Medallions from '../components/Medallions'
import CollectionSpotlight, {
  CollectionSpotlightCard,
} from '../components/CollectionSpotlight'
import { HeroOuter } from '../components/content/Hero'
import Zodiac from '../components/Zodiac'
import { useAnalytics } from '../lib/useAnalytics'
import HomeLocations from '../components/home/locations'

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

  useAnalytics('viewHome')

  return (
    <Layout>
      <SEO title="Home">
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <SanityContent rawContent={data.sanityPage._rawContent} />
      <BrandStatement />
      <CollectionSpotlight />
      <HomepageReviews />
      <OnePercentCallout />
      <HeroOuter
        heading="most gifted"
        subheading="discover the pieces you love to gift"
        button={{ text: 'shop gifts', path: '/collections/most-gifted' }}
        align="left"
      >
        <StaticImage src="../images/homepage-jul-22/most-gifted.jpg" alt="" />
      </HeroOuter>
      <Container variant="full">
        <Zodiac />
      </Container>
      <HomeLocations />
      <Container variant="full" pt={[5, 6, 7, 8]} sx={{ bg: 'bbBeige' }}>
        <Medallions />
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    sanityPage(title: { eq: "Home" }) {
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
