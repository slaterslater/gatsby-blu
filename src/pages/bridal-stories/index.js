import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import BridalStory from '../../components/BridalStory'
import Layout from '../../components/layout'
import StoriesHeader from '../../components/StoriesHeader'

const StoriesPage = ({ data }) => {
  const pageTitle = 'our bridal stories'
  const stories = data?.stories.nodes
  return (
    <Layout
      title={pageTitle}
      description="calling all beloved couples: we want to celebrate your love story! click here to share your story and show us your rings"
    >
      <StoriesHeader
        title={pageTitle}
        description="the very best love stories are the ones that are true: our ever-growing collective of beloved couples share the stories of how they found each other and the rings that embody their everlasting love."
      >
        <StaticImage
          src="../../images/stories/header.png"
          alt=""
          objectFit="cover"
          placeholder="blurred"
          height={400}
        />
      </StoriesHeader>
      {stories.map((story, i) => (
        <BridalStory key={story.id} details={story} index={i} />
      ))}
    </Layout>
  )
}

export default StoriesPage

export const query = graphql`
  {
    stories: allSanityStory(sort: { fields: _createdAt, order: DESC }) {
      nodes {
        id
        title
        quote
        people {
          name
          social
          wearing
          shopLink
        }
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 415, height: 525)
          }
        }
        overlay {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 360, height: 415)
          }
        }
      }
    }
  }
`
