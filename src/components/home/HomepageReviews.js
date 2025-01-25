import React, { useState } from 'react'
import { IconButton, Flex, Text, Box, Container } from 'theme-ui'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ReviewStars } from '../product/ProductReviewsTopline'
import ThemeLink from '../app/ThemeLink'
import { MobileSlider } from '../content/CollectionRow'
// import ShopifyGatsbyImage from '../ShopifyGatsbyImage'

const MotionBox = motion.create(Box)

const Review = ({ starPercentage, excerpt, author, product }) => {
  const image = product.media[0].image.gatsbyImageData
  if (!image) return
  return (
    <AnimatePresence>
      <Flex sx={{ flexWrap: 'wrap-reverse' }} mb={[0, 5]}>
        <Box sx={{ flex: '1 260px', textAlign: 'center' }} pr={[0, 5]}>
          <Text variant="caps" sx={{ display: 'block' }} py={6}>
            From our Guests
          </Text>
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
            <GatsbyImage image={image} alt="" />
          </MotionBox>
        </Flex>
      </Flex>
    </AnimatePresence>
  )
}

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
  <Container variant="medium" pb={[0, 0, 0, 0]}>
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
