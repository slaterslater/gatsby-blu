import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Text, Box, Container } from 'theme-ui'
import Layout from '../../components/layout'
import FormattedDate from '../../components/FormattedDate'
import { ShopifyHtml } from '../../components/ShopifyHtml'
import SEO from '../../components/seo'

const BlogTemplate = ({ data }) => {
  // if (!data) return null
  const { title, excerpt, image, publishedAt, contentHtml, authorV2, seo } =
    data.shopifyArticle

  return (
    <Layout>
      <SEO
        title={seo.title || title}
        description={seo.description || excerpt || seo.title || title}
        shopifyImage={image}
      />
      <Container sx={{ maxWidth: 800 }}>
        <Box pb={4}>
          <Text variant="caps">
            <FormattedDate iso={publishedAt} format="DATE_FULL" />
          </Text>
        </Box>
        <Heading as="h1">{title}</Heading>
        <ShopifyHtml
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        />
        <Box pt={4}>
          <Text variant="caps">Written By {authorV2.name}</Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
  query BlogArticlePage($handle: String!) {
    shopifyArticle(handle: { eq: $handle }) {
      title
      excerpt
      contentHtml
      publishedAt
      image {
        altText
        url
        id
        height
        width
      }
      authorV2 {
        name
      }
      seo {
        title
        description
      }
    }
  }
`
