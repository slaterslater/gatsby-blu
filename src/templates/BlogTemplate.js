import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Grid, Box, Container } from 'theme-ui'

import Layout from '../components/layout'
import TopStory from '../components/blog/TopStory'
import ArticleListItem from '../components/blog/ArticleListItem'

const BlogTemplate = props => {
  const topStory = props.data.allShopifyArticle.nodes[0]
  return (
    <Layout>
      <Container>
        <Heading pb={4}>Blog</Heading>
        <TopStory article={topStory} mb={[6, 6, 7]} />
        <Grid sx={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: [6, 6, 7] }}>
          {props.data.allShopifyArticle.nodes.slice(1).map(article => (
            <ArticleListItem article={article} key={article.id} />
          ))}
        </Grid>
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
