import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

import SEO from '../components/seo'
import HomepageReviews from '../components/HomepageReviews'
import SanityContent from '../components/SanityContent'
import BrandStatement from '../components/BrandStatement'
import CollectionSpotlight from '../components/CollectionSpotlight'
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
