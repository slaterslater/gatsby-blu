import { Text, Flex, Grid, Box, Link } from 'theme-ui'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'

export const ReviewStars = ({ starPercentage }) => (
  <Grid sx={{ display: 'inline-grid' }}>
    <Box sx={{ display: 'inline-block', gridArea: '1 / -1 / 1 / -1' }}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <IoIosStarOutline
            key={`outline-${i}`}
            size={10}
            style={{ marginLeft: '4px' }}
          />
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
            <IoIosStar
              key={`full-${i}`}
              size={10}
              style={{ marginLeft: '4px' }}
            />
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
      <Box pl={2}>
        <Text
          as="p"
          sx={{
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            lineHeight: '1.5em',
          }}
        >
          be the first to{' '}
          <Link as="a" href="#reviews">
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
      }}
    >
      <Text as="p">
        <Link
          as="a"
          variant="caps"
          href="#reviews"
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
