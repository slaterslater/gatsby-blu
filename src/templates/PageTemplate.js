import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Box, Container } from 'theme-ui'
import Layout from '../components/layout'

const BlogTemplate = ({ data }) => (
  <Layout>
    <Container>
      <Heading>{data.shopifyPage.title}</Heading>
      <Box
        dangerouslySetInnerHTML={{
          __html: data.shopifyPage.body,
        }}
      />
    </Container>
  </Layout>
)

export default BlogTemplate

export const query = graphql`
  query Page($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      title
      body
      handle
    }
  }
`
