import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BelovedLinks from '../components/BelovedLinks'

import SEO from '../components/seo'
import BrandStatement from '../components/BrandStatement'
import InstagramFeed from '../components/InstagramFeed'
import BookConsultation from '../components/BookConsultation'
import ReviewsSlider from '../components/ReviewsSlider'
import HomepageHero from '../components/HomepageHero'
import SanityContent from '../components/SanityContent'

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
      <BelovedLinks />
      <BrandStatement />
      <BookConsultation />
      <ReviewsSlider />
      <InstagramFeed />
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
