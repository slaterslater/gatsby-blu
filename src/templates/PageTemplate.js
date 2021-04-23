import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Box, Container } from 'theme-ui'
import Layout from '../components/layout'
import ShopifyHtml from '../components/ShopifyHtml'

const BlogTemplate = ({ data }) => (
  <Layout>
    <Container as="main" pb={8}>
      <Box pt={7} pb={2}>
        <Heading>{data.shopifyPage.title}</Heading>
      </Box>
      <ShopifyHtml
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
