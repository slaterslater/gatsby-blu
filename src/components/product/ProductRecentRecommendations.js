import React, { useContext, useState } from 'react'
import { useQuery, gql } from 'urql'
import { NavLink, Flex, Grid, Container, Text } from 'theme-ui'
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

const useProductHandles = ({ currentTab, tags }) => {
  const recentlyViewed = useContext(RecentlyViewedProductsContext)
  const { handle } = useMatch('/products/:handle')

  if (currentTab === 'recent') {
    return recentlyViewed.filter(recent => recent !== handle).slice(0, 3)
  }

  if (currentTab === 'stack') {
    const stackHandles = tags
      .filter(tag => tag.includes('__with'))
      .map(tag => {
        const [, stackHandle] = tag.split(':')
        return stackHandle
      })
    return stackHandles
  }

  return []
}

const NavTab = ({ current, ...props }) => (
  <NavLink
    sx={{
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontWeight: current ? 'bold' : 'normal',
      fontSize: 1,
      textAlign: 'center',
    }}
    {...props}
  />
)

const ProductRecentRecommendations = ({ tags }) => {
  const [tab, setTab] = useState('stack')

  const handles = useProductHandles({ currentTab: tab, tags })

  return (
    <Container>
      <Flex py={6} sx={{ gap: 6, justifyContent: 'center' }}>
        <NavTab current={tab === 'stack'} onClick={() => setTab('stack')}>
          Stack It With
        </NavTab>
        <NavTab current={tab === 'recent'} onClick={() => setTab('recent')}>
          Recently Viewed
        </NavTab>
      </Flex>
      <Grid
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'center',
          gap: 8,
        }}
      >
        {handles.map(handle => (
          <Recent handle={handle} key={`recent-${handle}`} />
        ))}
      </Grid>
    </Container>
  )
}

export default ProductRecentRecommendations
