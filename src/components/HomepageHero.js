import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      image1: file(relativePath: { eq: "hero/jun-24/thursday_oceana.jpg" }) {
        childImageSharp {
          gatsbyImageData(quality: 90)
        }
      }
      imageMobile: file(
        relativePath: { eq: "hero/jun-24/thursday_oceana_MOBILE.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
    <Hero
      desktopImage1={data.image1}
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
