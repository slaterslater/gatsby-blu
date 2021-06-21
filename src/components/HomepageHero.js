import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      image1: file(relativePath: { eq: "hero/jun-21/monday_oceana.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      imageMobile: file(
        relativePath: { eq: "hero/jun-21/monday_oceana_MOBILE.jpg" }
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
      title="endless ocean"
      subtitle="conjuring treasures from the deep"
      button={{
        label: 'shop ocean inspired',
        path: '/collections/ocean-inspired',
      }}
    />
  )
}

export default HomepageHero
