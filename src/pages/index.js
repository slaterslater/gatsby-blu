import React from 'react'
import { Box } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import BelovedLinks from '../components/BelovedLinks'
import CollectionSlider from '../components/CollectionSlider'

import SEO from '../components/seo'
import BrandStatement from '../components/BrandStatement'
import InstagramFeed from '../components/InstagramFeed'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Hero
      images={[]}
      title="Shed Your Skin"
      subtitle="Poignant &bull; Beautiful &bull; Enduring"
      button={{
        label: 'Shop New Beginnings',
        path: '/shop/new-beginnings',
      }}
    />
    <CollectionSlider
      title="Modern Fine Jewelry"
      subtitle="handcrafted + ethically sourced"
      slides={[
        {
          title: 'Necklaces',
          to: '/shop/necklaces',
          buttonLabel: 'Shop All',
          fluid: data.necklaceFile.childImageSharp.fluid,
        },
        {
          title: 'Rings',
          to: '/shop/rings',
          buttonLabel: 'Shop All',
          fluid: data.ringFile.childImageSharp.fluid,
        },
        {
          title: 'Earrings',
          to: '/shop/earrings',
          buttonLabel: 'Shop All',
          fluid: data.earringFile.childImageSharp.fluid,
        },
        {
          title: 'Engagement',
          to: '/shop/engagement',
          buttonLabel: 'Shop All',
          fluid: data.engagementFile.childImageSharp.fluid,
        },
        {
          title: 'Bracelets',
          to: '/shop/bracelets',
          buttonLabel: 'Shop All',
          fluid: data.braceletFile.childImageSharp.fluid,
        },
      ]}
    />
    <BelovedLinks />
    <BrandStatement />
    <Box>book engagement section</Box>
    <Box>reviews</Box>
    <InstagramFeed />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    necklaceFile: file(
      relativePath: { eq: "collection-slider-necklaces.jpg" }
    ) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ringFile: file(relativePath: { eq: "collection-slider-rings.jpg" }) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    earringFile: file(relativePath: { eq: "collection-slider-earrings.jpg" }) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    engagementFile: file(
      relativePath: { eq: "collection-slider-engagement.jpg" }
    ) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    braceletFile: file(
      relativePath: { eq: "collection-slider-bracelets.jpg" }
    ) {
      childImageSharp {
        # Specify a fluid image and fragment
        # The default maxWidth is 800 pixels
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
