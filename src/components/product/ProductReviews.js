import React, { useState } from 'react'
import { Button, NavLink, Grid, Flex, Container, Divider } from 'theme-ui'
import ProductReview from './ProductReview'
import ProductQuestion from './ProductQuestion'

const ProductReviews = ({ yotpoProductReview, yotpoProductQa }) => {
  const [currentTab, setCurrentTab] = useState('reviews')
  return (
    <Container pt={8}>
      <Flex sx={{ alignItems: 'baseline' }} pb={4}>
        <Flex pb={6}>
          <NavLink onClick={() => setCurrentTab('reviews')} mr={4}>
            Reviews
          </NavLink>
          <NavLink onClick={() => setCurrentTab('qa')}>Questions</NavLink>
        </Flex>
        <Button type="button" ml="auto">
          Write a Review
        </Button>
      </Flex>

      {currentTab === 'reviews' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
          {yotpoProductReview?.reviews.map(node => (
            <>
              <Divider />
              <ProductReview key={node.id} {...node} />
            </>
          ))}
        </Grid>
      )}
      {currentTab === 'qa' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
          {yotpoProductQa?.questions.map(node => (
            <>
              <Divider />
              <ProductQuestion key={node.id} {...node} />
            </>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ProductReviews
