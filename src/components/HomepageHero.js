import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      desktopImage1: file(
        relativePath: { eq: "hero/jun-8/desktop1-shade.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 1280)
        }
      }
      desktopImage2: file(
        relativePath: { eq: "hero/jun-8/desktop2-shade.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 1280)
        }
      }
      mobileImage: file(relativePath: { eq: "hero/jun-8/mobile.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  console.log(data.desktopImage2)

  return (
    <Hero
      desktopImage1={data.desktopImage1}
      desktopImage2={data.desktopImage2}
      mobileImage={data.mobileImage}
      title="Honour deep love"
      subtitle="our fate is forever written in the stars"
      button={{
        label: 'Shop Love',
        path: '/collections/love',
      }}
    />
  )
}

export default HomepageHero
