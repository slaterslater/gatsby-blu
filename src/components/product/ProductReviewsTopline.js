import { Flex, Grid, Box } from 'theme-ui'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'

const ReviewStars = ({ starPercentage }) => (
  <Grid>
    <Box sx={{ display: 'inline-block', gridArea: '1 / -1 / 1 / -1' }}>
      {Array(5)
        .fill()
        .map(() => (
          <IoIosStarOutline />
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
          .map(() => (
            <IoIosStar />
          ))}
      </Box>
    </Box>
  </Grid>
)

const ProductReviewsTopline = ({ score, possibleScore, totalReviews }) => {
  const starPercentage = (score / possibleScore) * 100
  const starPercentageRounded = Math.round(starPercentage / 10) * 10

  return (
    <Flex>
      <ReviewStars starPercentage={starPercentageRounded} />
    </Flex>
  )
}

export default ProductReviewsTopline
