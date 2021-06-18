import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      desktopImage1: file(
        relativePath: { eq: "hero/jun-18/wildflower_two.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      desktopImage2: file(
        relativePath: { eq: "hero/jun-18/wildflower_two2.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
      mobileImage: file(
        relativePath: { eq: "hero/jun-18/wildflower_two3.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
    <Hero
      desktopImage1={data.desktopImage1}
      desktopImage2={data.desktopImage2}
      mobileImage={data.mobileImage}
      title="begin to bloom"
      subtitle="bring wild beauty to our lives"
      button={{
        label: 'shop best sellers',
        path: '/collections/best-sellers-1',
      }}
    />
  )
}

export default HomepageHero
