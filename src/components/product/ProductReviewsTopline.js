import { Text, Flex, Grid, Box, Link } from 'theme-ui'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'

export const ReviewStars = ({ starPercentage }) => (
  <Grid sx={{ display: 'inline-grid' }}>
    <Box sx={{ display: 'inline-block', gridArea: '1 / -1 / 1 / -1' }}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <Box as={IoIosStarOutline} key={`outline-${i}`} size={10} ml={1} />
        ))}
    </Box>
    <Box
      sx={{
        display: 'inline-block',
        gridArea: '1 / -1 / 1 / -1',
        zIndex: 1,
      }}
    >
      <Box
        style={{
          width: `${starPercentage}%`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {Array(5)
          .fill()
          .map((_, i) => (
            <Box as={IoIosStar} key={`full-${i}`} size={10} ml={1} />
          ))}
      </Box>
    </Box>
  </Grid>
)

const ProductReviewsTopline = ({
  score,
  possibleScore,
  totalReviews,
  isOOAK = false,
}) => {
  const scrollToReviews = () => {
    const top = document.getElementById('reviews').offsetTop
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // 2DO make scroll function and use everywhere
  if (isOOAK)
    return (
      <Link
        as="a"
        onClick={scrollToReviews}
        sx={{
          fontSize: 0,
          fontWeight: 'heading',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        py={4}
      >
        read reviews
      </Link>
    )
  const starPercentage = (score / possibleScore) * 100
  const starPercentageRounded = Math.round(starPercentage / 10) * 10
  const numericalAverage = Number.parseFloat(
    starPercentage * possibleScore * 0.01
  ).toPrecision(3)

  if (!totalReviews)
    return (
      <Box pl={2}>
        <Text
          as="p"
          sx={{
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            lineHeight: '1.5em',
            fontWeight: 'heading',
            a: { cursor: 'pointer' },
          }}
        >
          <Link as="a" onClick={scrollToReviews}>
            write a review
          </Link>
        </Text>
      </Box>
    )

  return (
    <Flex
      pl={2}
      sx={{
        alignItems: 'flex-end',
        cursor: 'pointer',
      }}
      onClick={scrollToReviews}
    >
      <Text as="p">
        <Link
          as="a"
          variant="caps"
          mr={2}
          sx={{
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            textDecoration: 'underline',
          }}
        >
          {totalReviews > 1 ? 'Reviews' : 'Review'}
        </Link>
      </Text>
      <ReviewStars starPercentage={starPercentageRounded} />
      <Text as="p" sx={{ fontSize: 0 }} ml={3}>
        {numericalAverage}
      </Text>
    </Flex>
  )
}

export default ProductReviewsTopline
