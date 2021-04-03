import React, { useState } from 'react'
import { NavLink, Grid, Flex, Container } from 'theme-ui'
import ProductReview from './ProductReview'

const ProductReviews = ({ allYotpoProductReview }) => {
  const [currentTab, setCurrentTab] = useState('reviews')
  return (
    <Container>
      <Flex pb={6}>
        <NavLink onClick={() => setCurrentTab('reviews')} mr={4}>
          Reviews
        </NavLink>
        <NavLink onClick={() => setCurrentTab('qa')}>Questions</NavLink>
      </Flex>

      {currentTab === 'reviews' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 6 }}>
          {allYotpoProductReview?.nodes.map(node => (
            <ProductReview key={node.id} {...node} />
          ))}
        </Grid>
      )}
      {currentTab === 'qa' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 6 }}>questions</Grid>
      )}
    </Container>
  )
}

export default ProductReviews
