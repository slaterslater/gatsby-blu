import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      image1: file(relativePath: { eq: "hero/jun-28/homepage_split.jpg" }) {
        childImageSharp {
          gatsbyImageData(quality: 82)
        }
      }
      image2: file(relativePath: { eq: "hero/jun-28/homepage_split2.jpg" }) {
        childImageSharp {
          gatsbyImageData(quality: 82)
        }
      }
      imageMobile: file(
        relativePath: { eq: "hero/jun-28/homepage_mobile.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(quality: 82)
        }
      }
    }
  `)

  return (
    <Hero
      desktopImage1={data.image1}
      desktopImage2={data.image2}
      mobileImage={data.imageMobile}
      title="oceana"
      subtitle="let the waves carry you where the light cannot"
      button={{
        label: 'shop ocean inspired',
        path: '/collections/ocean-inspired',
      }}
    />
  )
}

export default HomepageHero
