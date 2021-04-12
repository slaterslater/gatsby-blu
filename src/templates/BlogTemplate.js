import React from 'react'
import { graphql, Link } from 'gatsby'
import { Heading, Box, Container } from 'theme-ui'

import Layout from '../components/layout'
import TopStory from '../components/blog/TopStory'

const BlogTemplate = props => {
  const topStory = props.data.allShopifyArticle.nodes[0]
  return (
    <Layout>
      <Container>
        <Heading>Blog</Heading>
        <TopStory
          image={topStory.image}
          title={topStory.title}
          path={topStory.handle}
        />
        {props.data.allShopifyArticle.nodes.slice(1).map(story => (
          <Box key={story.id}>
            <Link to={`/blog/news/${story.handle}`}>{story.title}</Link>
          </Box>
        ))}
      </Container>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
  query BlogPage($limit: Int!, $skip: Int!) {
    allShopifyArticle(
      limit: $limit
      skip: $skip
      filter: { blog: { title: { eq: "blog" } } }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      nodes {
        title
        handle
        content
        image {
          src
          altText
        }
        blog {
          title
        }
      }
    }
  }
`
