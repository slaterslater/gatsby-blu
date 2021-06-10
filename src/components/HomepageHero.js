import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      desktopImage1: file(relativePath: { eq: "hero/jun-10/imprint.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      desktopImage2: file(relativePath: { eq: "hero/jun-10/imprint2.jpg" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      mobileImage: file(relativePath: { eq: "hero/jun-10/imprint3.jpg" }) {
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
      title="a record of love received"
      subtitle="your loved ones leave indelible marks on your soul"
      button={{
        label: 'Shop Love',
        path: '/collections/love',
      }}
    />
  )
}

export default HomepageHero
