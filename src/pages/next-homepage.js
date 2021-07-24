import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import SEO from '../components/seo'
import SanityContent from '../components/SanityContent'
import BrandStatement from '../components/BrandStatement'
import CollectionSpotlight from '../components/CollectionSpotlight'

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
