import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      sanityPage(title: { eq: "Home" }) {
        content {
          ... on SanityHero {
            image1 {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  console.log(data.sanityPage)

  return (
    <Hero
      desktopImage1={data.sanityPage.content.image1.asset.gatsbyImageData}
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
