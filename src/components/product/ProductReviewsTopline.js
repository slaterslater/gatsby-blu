import { Text, Flex, Grid, Box, Link } from 'theme-ui'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'

export const ReviewStars = ({ starPercentage }) => (
  <Grid>
    <Box sx={{ display: 'inline-block', gridArea: '1 / -1 / 1 / -1' }}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <IoIosStarOutline key={`outline-${i}`} />
        ))}
    </Box>
    <Box
      sx={{ display: 'inline-block', gridArea: '1 / -1 / 1 / -1', zIndex: 1 }}
    >
      <Box
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
        style={{ width: `${starPercentage}%` }}
      >
        {Array(5)
          .fill()
          .map((_, i) => (
            <IoIosStar key={`full-${i}`} />
          ))}
      </Box>
    </Box>
  </Grid>
)

const ProductReviewsTopline = ({ score, possibleScore, totalReviews }) => {
  const starPercentage = (score / possibleScore) * 100
  const starPercentageRounded = Math.round(starPercentage / 10) * 10
  const numericalAverage = Number.parseFloat(
    starPercentage * possibleScore * 0.01
  ).toPrecision(3)

  if (!totalReviews)
    return (
      <Box>
        <Text as="p">
          be the first to{' '}
          <Link as="a" href="#reviews">
            write a review
          </Link>
        </Text>
      </Box>
    )

  return (
    <Grid
      sx={{
        gridTemplateColumns: 'repeat(4, max-content)',
        alignItems: 'baseline',
        gap: 3,
      }}
    >
      <ReviewStars starPercentage={starPercentageRounded} />
      <Text as="p" sx={{ fontSize: 2, fontWeight: 'medium' }}>
        {numericalAverage}
      </Text>
      <Box sx={{ width: 1, height: '100%', bg: 'border' }} />
      <Text as="p" sx={{ fontSize: 1 }}>
        <Link as="a" variant="nav" href="#reviews">
          See {totalReviews} {totalReviews > 1 ? 'Reviews' : 'Review'}
        </Link>
      </Text>
    </Grid>
  )
}

export default ProductReviewsTopline
