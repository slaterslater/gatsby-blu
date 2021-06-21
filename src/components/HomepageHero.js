import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Hero from './Hero'

const HomepageHero = props => {
  const data = useStaticQuery(graphql`
    {
      sanityPage(title: { eq: "Home" }) {
        content {
          ... on SanityHero {
            heading
            subheading
            button {
              path
              text
            }
            image1 {
              asset {
                gatsbyImageData
              }
            }
            image2 {
              asset {
                gatsbyImageData
              }
            }
            imageMobile {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Hero
      desktopImage1={data.sanityPage.content.image1.asset.gatsbyImageData}
      desktopImage2={data.sanityPage.content.image2.asset.gatsbyImageData}
      mobileImage={data.sanityPage.content.imageMobile.asset.gatsbyImageData}
      title={data.sanityPage.content.heading}
      subtitle={data.sanityPage.content.subheading}
      button={{
        label: data.sanityPage.content.button.text,
        path: data.sanityPage.content.button.path,
      }}
    />
  )
}

export default HomepageHero
