import React from 'react'
import { graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import BelovedLinks from '../components/BelovedLinks'
import CollectionSlider from '../components/CollectionSlider'

import SEO from '../components/seo'
import BrandStatement from '../components/BrandStatement'
import InstagramFeed from '../components/InstagramFeed'
import BookConsultation from '../components/BookConsultation'
import ReviewsSlider from '../components/ReviewsSlider'

const IndexPage = ({ data }) => {
  const location = useLocation()

  const websiteLdJSON = `
  {
      "@context": "https://schema.org",
      "@type": "Website",
      "url": "${location.href}",
      "about" : {
        "@type":"Thing",
        "name":"Jewelry Store"
      },
      "potentialAction": {
          "@type": "SearchAction",
          "target": "${location.origin}/search?q={query}&type=product",
          "query-input": "required name=query"
      }
  }
`

  return (
    <Layout>
      <SEO title="Home">
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <Hero
        images={[]}
        title="shed your skin"
        subtitle="Poignant &bull; Beautiful &bull; Enduring"
        button={{
          label: 'Shop New Beginnings',
          path: '/shop/collections/new-beginnings',
        }}
      />
      <CollectionSlider
        title="Modern Fine Jewelry"
        subtitle="handcrafted + ethically sourced"
        slides={[
          {
            title: 'Necklaces',
            to: '/collections/necklaces',
            buttonLabel: 'Shop All',
            image: data.necklaceFile.childImageSharp.gatsbyImageData,
          },
          {
            title: 'Rings',
            to: '/collections/rings',
            buttonLabel: 'Shop All',
            image: data.ringFile.childImageSharp.gatsbyImageData,
          },
          {
            title: 'Earrings',
            to: '/collections/earrings',
            buttonLabel: 'Shop All',
            image: data.earringFile.childImageSharp.gatsbyImageData,
          },
          {
            title: 'Engagement',
            to: '/collections/engagement',
            buttonLabel: 'Shop All',
            image: data.engagementFile.childImageSharp.gatsbyImageData,
          },
          {
            title: 'Bracelets',
            to: '/collections/bracelets',
            buttonLabel: 'Shop All',
            image: data.braceletFile.childImageSharp.gatsbyImageData,
          },
        ]}
      />
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
    necklaceFile: file(
      relativePath: { eq: "collection-slider-necklaces.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData
      }
    }
    ringFile: file(relativePath: { eq: "collection-slider-rings.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    earringFile: file(relativePath: { eq: "collection-slider-earrings.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    engagementFile: file(
      relativePath: { eq: "collection-slider-engagement.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData
      }
    }
    braceletFile: file(
      relativePath: { eq: "collection-slider-bracelets.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
