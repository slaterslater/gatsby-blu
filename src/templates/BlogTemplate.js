import React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Heading, Grid, Box, Container, Link } from 'theme-ui'

import Layout from '../components/layout'
import Pagination from '../components/Pagination'
import TopStory from '../components/blog/TopStory'
import ArticleListItem from '../components/blog/ArticleListItem'

const BlogTemplate = ({ data, pageContext }) => {
  const { limit, skip, currentPage } = pageContext
  const topStory = data.allShopifyArticle.nodes[0]

  const totalPages = Math.ceil(data.allShopifyArticle.totalCount / limit)

  return (
    <Layout>
      <Container>
        <Heading pb={4}>Blog</Heading>
        <TopStory article={topStory} mb={[6, 6, 7]} />
        <Grid sx={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: [6, 6, 7] }}>
          {data.allShopifyArticle.nodes.slice(1).map(article => (
            <ArticleListItem article={article} key={article.id} />
          ))}
        </Grid>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          getLinkForPage={page => {
            if (page === 1) return `/blog/news`
            return `/blog/news/page-${page}`
          }}
          pt={7}
        />
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
      totalCount
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
