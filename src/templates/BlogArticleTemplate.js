import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Box, Container } from 'theme-ui'
import Layout from '../components/layout'

const BlogTemplate = props => (
  <Layout>
    <Container>
      <Heading>{props.data.shopifyArticle.title}</Heading>
    </Container>
  </Layout>
)

export default BlogTemplate

export const query = graphql`
  query BlogArticlePage($handle: String!) {
    shopifyArticle(handle: { eq: $handle }) {
      title
    }
  }
`
