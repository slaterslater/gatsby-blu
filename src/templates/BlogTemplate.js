import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Heading, Grid, Box, Container, Link, Text } from 'theme-ui'

import Layout from '../components/layout'
import Pagination from '../components/Pagination'
import TopStory from '../components/blog/TopStory'
import ArticleListItem from '../components/blog/ArticleListItem'
import ReviewPagination from '../components/reviews/ReviewPagination'
import SEO from '../components/seo'

const BlogTemplate = ({ data, pageContext }) => {
  const { limit, currentPage } = pageContext
  // const topStory = data.allShopifyArticle.nodes[0]

  const totalPages = Math.ceil(data.allShopifyArticle.totalCount / limit)

  return (
    <Layout>
      <SEO
        title="bluboho blog"
        shopifyImage={data.allShopifyArticle.nodes[0]?.image}
      />
      <Container>
        <Heading as="h1" variant="h2" sx={{ textAlign: 'center' }} pb={4}>
          stories
        </Heading>
        <Text
          as="p"
          variant="copy"
          sx={{ textAlign: 'center', lineHeight: 2, maxWidth: 600 }}
          mx="auto"
          mb={6}
        >
          birthstone jewelry has been a popular and meaningful gifting option
          for generations. whether you choose to wear your own birthstone, or
          the birthstone...
        </Text>
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
            gap: [4, 5, 6],
          }}
          mb={4}
        >
          {data.allShopifyArticle.nodes.map((article, i) => (
            <ArticleListItem article={article} key={article.id} index={i} />
          ))}
        </Grid>
        <ReviewPagination
          totalPages={totalPages}
          currentPage={currentPage}
          boundaryPages={2}
          getLinkForPage={page => {
            if (page === 1) return `/blogs/news`
            return `/blogs/news/page-${page}`
          }}
          pt={7}
        />
      </Container>
    </Layout>
  )
}

BlogTemplate.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number,
    currentPage: PropTypes.number,
  }).isRequired,
  data: PropTypes.shape({
    allShopifyArticle: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
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
        id
        title
        handle
        image {
          url
          altText
          height
          width
          id
        }
        blog {
          title
        }
      }
    }
  }
`
