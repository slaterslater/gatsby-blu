import React, { useState } from 'react'
import { IconButton, Flex, Heading, Text, Box, Grid, Container } from 'theme-ui'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useStaticQuery, graphql } from 'gatsby'
import { useQuery } from 'urql'
import { GatsbyImage } from 'gatsby-plugin-image'
import { wrap } from '@popmotion/popcorn'
import { ReviewStars } from './product/ProductReviewsTopline'
import ThemeLink from './app/ThemeLink'
import { HOMEPAGE_REVIEW_PRODUCT } from '../queries/homepage'
import { useShopifyImage } from '../hooks/shopifyImage'
import { MobileSlider } from './content/CollectionRow'

const Review = ({
  starPercentage,
  excerpt,
  author,
  product: { handle, title },
}) => {
  const [{ data }] = useQuery({
    query: HOMEPAGE_REVIEW_PRODUCT,
    variables: { handle },
  })

  const image = data?.productByHandle?.images.edges[0].node
  const imageData = useShopifyImage({ image })

  return (
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
          to={`/products/${handle}`}
        >
          shop {title}
        </ThemeLink>
      </Box>
      <Flex sx={{ flex: '1 260px', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: ['75%', '100%'] }}>
          <GatsbyImage image={imageData} alt={image?.altText} />
        </Box>
      </Flex>
    </Flex>
  )
}

const DesktopReviews = ({ data }) => {
  const [currentReview, setReview] = useState(0)
  const setCurrentReview = index => {
    setReview(
      wrap(0, data.allHomepageReviewsJson.nodes.length, currentReview + index)
    )
  }

  return (
    <>
      <AnimatePresence>
        {data.allHomepageReviewsJson.nodes.map((node, i) =>
          currentReview === i ? (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: 9 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
            >
              <Review
                starPercentage={(node.score / 5) * 100}
                author={node.author}
                excerpt={node.content}
                product={node.product}
              />
            </motion.div>
          ) : (
            false
          )
        )}
      </AnimatePresence>
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
    <Container variant="medium">
      <Box sx={{ display: ['none', 'block'] }}>
        <DesktopReviews data={data} />
      </Box>
      <MobileSlider
        sx={{ display: ['block', 'none'] }}
        nodes={data.allHomepageReviewsJson.nodes.map(node => (
          <Review
            key={node.id}
            starPercentage={(node.score / 5) * 100}
            author={node.author}
            excerpt={node.content}
            product={node.product}
          />
        ))}
        minCardWidth={280}
      />
    </Container>
  )
}

export default ReviewsSlider
