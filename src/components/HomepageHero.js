import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      desktopImage1: file(relativePath: { eq: "hero/jun-17/wildflowers.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      mobileImage: file(relativePath: { eq: "hero/jun-17/wildflowers.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
    <Hero
      desktopImage1={data.desktopImage1}
      mobileImage={data.mobileImage}
      button={{
        label: 'shop wanderess ',
        path: '/collections/wanderess',
      }}
    />
  )
}

export default HomepageHero
