import React, { useContext, useState } from 'react'
import { useQuery, gql } from 'urql'
import { Box, Grid, Container, Text } from 'theme-ui'
import { useMatch } from '@reach/router'
import { RecentlyViewedProductsContext } from '../../contexts/RecentlyViewedProductsContext'
import SearchProduct from '../SearchProduct'
import { SEARCH_PRODUCT_FRAGMENT } from '../../queries/search'

const RECENT_PRODUCT_QUERY = gql`
  ${SEARCH_PRODUCT_FRAGMENT}
  query RecentProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductSearchFields
    }
  }
`

const Recent = ({ handle }) => {
  const [{ data }] = useQuery({
    query: RECENT_PRODUCT_QUERY,
    variables: { handle },
  })

  if (!data?.productByHandle) return false

  return (
    <SearchProduct
      product={data.productByHandle}
      images={data.productByHandle.images.edges.map(({ node }) => node)}
    />
  )
}

const ProductRecentRecommendations = ({ tags }) => {
  const [tab, setTab] = useState('recent')
  const recentlyViewed = useContext(RecentlyViewedProductsContext)
  const { handle } = useMatch('/products/:handle')

  if (!recentlyViewed?.length) return false

  const recents = recentlyViewed.filter(recent => recent !== handle).slice(0, 3)

  if (!recents.length) return false

  return (
    <Container>
      <Box py={6}>
        <Text as="h3" variant="caps" sx={{ fontSize: 2, textAlign: 'center' }}>
          recently viewed
        </Text>
      </Box>
      <Grid sx={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {recents.map(recent => (
          <Recent handle={recent} key={`recent-${recent}`} />
        ))}
      </Grid>
    </Container>
  )
}

export default ProductRecentRecommendations
