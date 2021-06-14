import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      desktopImage1: file(relativePath: { eq: "hero/jun-14/wildflower.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      mobileImage: file(relativePath: { eq: "hero/jun-14/wildflower2.jpg" }) {
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
      title="untameable courage"
      subtitle="wildflowers bloom where we least expect it"
      button={{
        label: 'shop wanderess ',
        path: '/collections/wanderess',
      }}
    />
  )
}

export default HomepageHero
