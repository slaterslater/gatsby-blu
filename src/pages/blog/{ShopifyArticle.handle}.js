import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Text, Box, Container } from 'theme-ui'
import Layout from '../../components/layout'
import FormattedDate from '../../components/FormattedDate'
import { ShopifyHtml } from '../../components/ShopifyHtml'
import SEO from '../../components/seo'

const BlogTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.shopifyArticle.title}
      description={data.shopifyArticle.excerpt}
    />
    <Container sx={{ maxWidth: 800 }}>
      <Box pb={4}>
        <Text variant="caps">
          <FormattedDate
            iso={data.shopifyArticle.publishedAt}
            format="DATE_FULL"
          />
        </Text>
      </Box>
      <Heading>{data.shopifyArticle.title}</Heading>
      <ShopifyHtml
        dangerouslySetInnerHTML={{
          __html: data.shopifyArticle.contentHtml,
        }}
      />
      <Box pt={4}>
        <Text variant="caps">Written By {data.shopifyArticle.author.name}</Text>
      </Box>
    </Container>
  </Layout>
)

export default BlogTemplate

export const query = graphql`
  query BlogArticlePage($handle: String!) {
    shopifyArticle(handle: { eq: $handle }) {
      title
      excerpt
      contentHtml
      publishedAt
      author {
        name
      }
    }
  }
`
