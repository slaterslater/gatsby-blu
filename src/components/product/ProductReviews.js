import React from 'react'
import { Grid, Avatar, Box, Heading, Flex, Text, Container } from 'theme-ui'
import { DateTime } from 'luxon'
import { ReviewStars } from './ProductReviewsTopline'

const ProductReview = ({ name, score, title, content, updatedAt }) => {
  const date = DateTime.fromISO(updatedAt).toLocaleString(DateTime.DATE_SHORT)
  const starPercentage = (score / 5) * 100
  console.log(starPercentage)

  return (
    <Flex>
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flex: 1 }} pl={6}>
        <Flex>
          <Text>{name}</Text>
          <Text>Verified Buyer</Text>
          <Text ml="auto">{date}</Text>
        </Flex>
        <ReviewStars starPercentage={starPercentage} />
        <Heading>{title}</Heading>
        <Text>{content}</Text>
      </Box>
    </Flex>
  )
}

const ProductReviews = ({ allYotpoProductReview }) => (
  <Container>
    <Heading pb={6}>Reviews</Heading>
    <Grid sx={{ gridAutoFlow: 'row', gap: 6 }}>
      {allYotpoProductReview?.nodes.map(node => (
        <ProductReview key={node.id} {...node} />
      ))}
    </Grid>
  </Container>
)

export default ProductReviews
