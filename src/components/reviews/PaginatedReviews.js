import { Text, Alert, Grid, Box, Divider } from 'theme-ui'
import React, { useState, useContext } from 'react'
import useSWR from 'swr'
import { ProductContext } from '../product/ProductContext'
import { useProductReviewsFallback } from '../product/ProductReviewsFallback'
import ProductReview from '../product/ProductReview'
import ReviewPagination from './ReviewPagination'
import { useAdminProductId, yotpoFetcher } from './utils'

const ReviewsList = props => {
  const perPage = 5
  const [page, setPage] = useState(1)
  const fallback = useProductReviewsFallback()

  const {
    product: { id },
  } = useContext(ProductContext)

  const [productId] = id.match(/\d+$/)

  const { data, fetching } = useSWR(
    `https://api-cdn.yotpo.com/v1/widget/${process.env.GATSBY_YOTPO_APP_KEY}/products/${productId}/reviews.json?page=1&per_page=100`,
    yotpoFetcher,
    { fallbackData: fallback }
  )

  if (!data?.data?.response?.reviews?.length && !fetching)
    return (
      <Alert variant="empty">
        <Text sx={{ fontSize: 1 }}>There are no reviews</Text>
      </Alert>
    )

  const totalPages =
    data.data.response.pagination &&
    Math.ceil(data.data.response.pagination.total / perPage)

  const currentReviews = data
    ? data.data.response.reviews.slice(perPage * (page - 1), perPage * page)
    : []

  return (
    <>
      <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
        {currentReviews.map(node => (
          <React.Fragment key={node.id}>
            <ProductReview {...node} />
            <Divider />
          </React.Fragment>
        ))}
      </Grid>
      <Box pt={6}>
        <ReviewPagination
          currentPage={page}
          onPageClick={n => {
            setPage(n)
          }}
          totalPages={totalPages}
          boundaryPages={2}
        />
      </Box>
    </>
  )
}

export default ReviewsList
