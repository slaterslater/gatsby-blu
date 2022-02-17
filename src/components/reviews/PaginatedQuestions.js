import { Text, Alert, Grid, Box, Divider } from 'theme-ui'
import React, { useEffect, useState, useContext, useRef } from 'react'
import useSWR from 'swr'
import { ProductContext } from '../product/ProductContext'
import { useProductReviewsFallback } from '../product/ProductReviewsFallback'
import ReviewPagination from './ReviewPagination'
import { useAdminProductId, yotpoFetcher } from './utils'
import ProductQuestion from '../product/ProductQuestion'

const PaginatedQuestions = props => {
  const perPage = 5
  const [page, setPage] = useState(1)
  const fallback = useProductReviewsFallback()

  const {
    product: { variants },
  } = useContext(ProductContext)

  const [variant] = variants || []
  const { sku } = variant || {}

  const { data, fetching } = useSWR(
    [
      `https://api.yotpo.com/products/${process.env.GATSBY_YOTPO_APP_KEY}/${sku}/questions`,
      'questions',
    ],
    yotpoFetcher,
    { fallbackData: fallback }
  )

  // console.log(data?.data.respo)

  if (!data?.data?.response?.questions?.length && !fetching)
    return (
      <Alert variant="empty">
        <Text sx={{ fontSize: 1 }}>There are no questions</Text>
      </Alert>
    )

  const totalPages =
    data.data.response.pagination &&
    Math.ceil(data.data.response.pagination.total / perPage)

  const currentQuestions = data
    ? data.data.response.questions.slice(perPage * (page - 1), perPage * page)
    : []

  return (
    <>
      <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
        {currentQuestions.map(node => (
          <React.Fragment key={node.id}>
            <ProductQuestion key={node.id} {...node} />
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

export default PaginatedQuestions
//   {data.reviews.map(node => (
//   ))}
//   </Grid>
// ))}
