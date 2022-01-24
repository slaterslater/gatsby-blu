import React, { useState } from 'react'
import { IconButton, Flex, Heading, Text, Box, Container } from 'theme-ui'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { ReviewStars } from '../product/ProductReviewsTopline'
import ThemeLink from '../app/ThemeLink'
import { MobileSlider } from '../content/CollectionRow'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'

const MotionBox = motion(Box)

const Review = ({ starPercentage, excerpt, author, product }) => (
  <AnimatePresence>
    <Flex sx={{ flexWrap: 'wrap-reverse' }}>
      <Box sx={{ flex: '1 260px', textAlign: 'center' }}>
        <Heading variant="caps" sx={{ py: 6 }}>
          From our Guests
        </Heading>
        <Box pb={4}>
          <ReviewStars starPercentage={starPercentage} />
        </Box>
        <Text as="p" pb={4} sx={{ textTransform: 'lowercase' }}>
          {excerpt}
        </Text>
        <Text as="p" pb={6}>
          {author}
        </Text>
        <ThemeLink
          variant="caps"
          sx={{ fontSize: 0, textDecoration: 'underline' }}
          to={`/products/${product.handle}`}
        >
          shop {product.title}
        </ThemeLink>
      </Box>
      <Flex sx={{ flex: '1 260px', justifyContent: 'center' }}>
        <MotionBox
          key={`review-image-${product.handle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ maxWidth: ['75%', '100%'] }}
        >
          <ShopifyGatsbyImage image={product.images[0] || {}} />
        </MotionBox>
      </Flex>
    </Flex>
  </AnimatePresence>
)

const DesktopReviews = ({ reviews }) => {
  const [currentReview, setReview] = useState(0)
  const setCurrentReview = index => {
    setReview(wrap(0, reviews.length, currentReview + index))
  }
  const review = reviews[currentReview]

  return (
    <>
      {review && (
        <Review
          starPercentage={(review.score / 5) * 100}
          author={review.author}
          excerpt={review.content}
          product={review.product}
        />
      )}
      <Flex sx={{ justifyContent: 'center', gap: 4 }}>
        <IconButton type="button" onClick={() => setCurrentReview(-1)}>
          <FiChevronLeft />
        </IconButton>
        <IconButton type="button" onClick={() => setCurrentReview(1)}>
          <FiChevronRight />
        </IconButton>
      </Flex>
    </>
  )
}

const ReviewsSlider = ({ reviews }) => (
  <Container variant="medium">
    <Box sx={{ display: ['none', 'block'] }}>
      <DesktopReviews reviews={reviews} />
    </Box>
    <MobileSlider
      sx={{ display: ['block', 'none'] }}
      nodes={reviews.map(review => (
        <Review
          key={`mobile-review-${review.poductHandle}`}
          starPercentage={(review.score / 5) * 100}
          author={review.author}
          excerpt={review.content}
          product={review.product}
        />
      ))}
      minCardWidth={280}
    />
  </Container>
)

export default ReviewsSlider
