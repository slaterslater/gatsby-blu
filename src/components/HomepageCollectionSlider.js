import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import CollectionSlider from './CollectionSlider'

const HomepageCollectionSlider = props => {
  const data = useStaticQuery(graphql`
    {
      necklaceFile: file(
        relativePath: { eq: "collection-slider/jun-21/necklaces.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      ringFile: file(
        relativePath: { eq: "collection-slider/jun-21/rings.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      earringFile: file(
        relativePath: { eq: "collection-slider/jun-21/earrings.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      engagementFile: file(
        relativePath: { eq: "collection-slider/jun-21/engagement.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      braceletFile: file(
        relativePath: { eq: "collection-slider/jun-21/bracelets.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
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
          to: '/collections/bridal',
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
  )
}

export default HomepageCollectionSlider
