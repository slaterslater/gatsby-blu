import React from 'react'
import { Link, Text, Box, Grid, Container } from 'theme-ui'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { ReviewStars } from './product/ProductReviewsTopline'

const ReviewsSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      allHomepageReviewsJson {
        nodes {
          author
          content
          score
          product {
            handle
            title
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Grid
        pt={6}
        sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 6,
        }}
      >
        {data.allHomepageReviewsJson.nodes.map(node => (
          <Box
            sx={{ textAlign: 'center' }}
            key={`${node.product.handle}-collection-slider`}
          >
            <Link
              as={GatsbyLink}
              to={`/products/${node.product.handle}`}
              sx={{ textDecoration: 'none' }}
            >
              <ReviewStars starPercentage={100} />
              <Box py={4}>
                <Box pb={2}>
                  <Text variant="caps">{node.product.title}</Text>
                </Box>
                <Text>{node.content}</Text>
              </Box>
              <Text>&mdash; {node.author}</Text>
            </Link>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}

export default ReviewsSlider
