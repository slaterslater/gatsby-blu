import React, { useContext, useState } from 'react'
import { useQuery, gql } from 'urql'
import { Box, NavLink, Flex, Grid, Container, Heading, Text } from 'theme-ui'
import { useMatch } from '@reach/router'
import { RecentlyViewedProductsContext } from '../../contexts/RecentlyViewedProductsContext'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import SearchProduct from '../SearchProduct'
import { SEARCH_PRODUCT_FRAGMENT } from '../../queries/search'
import { ProductContext } from './ProductContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ProductListItem from './ListItem'
import ProductModal from './ProductModal'

const Recent = ({ handle }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (!data?.product) return false

  const [title] = data.product.title.split(' - ')
  const hasRange =
    data.product.priceRange.maxVariantPrice.amount !==
    data.product.priceRange.minVariantPrice.amount

  return (
    <Box sx={{ scrollSnapAlign: 'start' }}>
      <ProductModal handle={handle}>
        <ProductListItem
          firstImage={data.product.images.edges[0]?.node}
          secondImage={data.product.images.edges[1]?.node}
          title={title}
          price={data.product.priceRange.minVariantPrice}
          hasRange={hasRange}
          availableForSale={data.product.availableForSale}
          tags={data.product.tags}
        />
      </ProductModal>
    </Box>
  )
}

const useRecentlyViewedHandles = () => {
  const recentlyViewed = useContext(RecentlyViewedProductsContext)
  const { handle } = useMatch('/products/:handle')

  return recentlyViewed?.filter(recent => recent !== handle).slice(0, 3) || []
}

const useStackHandles = () => {
  const {
    product: { tags },
  } = useContext(ProductContext)
  return tags
    ?.filter(tag => tag.includes('__with'))
    .map(tag => {
      const [, stackHandle] = tag.split(':')
      return stackHandle
    })
}

const NavTab = ({ isCurrent, ...props }) => (
  <Heading
    as={NavLink}
    pb={1}
    sx={{
      fontWeight: 400,
      borderBottom: '1px solid',
      borderColor: isCurrent ? 'black' : 'transparent',
      textTransform: 'uppercase',
      fontSize: 4,
      letterSpacing: 'widest',
    }}
    {...props}
  />
)

// const NavTab = ({ current, ...props }) => (
//   <NavLink
//     sx={{
//       textTransform: 'uppercase',
//       letterSpacing: 'caps',
//       fontWeight: current ? 'bold' : 'normal',
//       fontSize: 1,
//       textAlign: 'center',
//     }}
//     {...props}
//   />
// )

const ProductsList = ({ handles }) =>
  handles.map(handle => <Recent handle={handle} key={`recent-${handle}`} />)

const ProductRecentRecommendations = () => {
  const stackHandles = useStackHandles()
  const recentHanldes = useRecentlyViewedHandles()

  const [tab, setTab] = useState('stack')

  return (
    <Container px={[0, 6, 7]} ml={[0, 'auto']} mr={[-5, 'auto']}>
      <Flex py={6} sx={{ gap: 6, justifyContent: 'center' }}>
        <NavTab isCurrent={tab === 'stack'} onClick={() => setTab('stack')}>
          Stack It With
        </NavTab>
        <NavTab isCurrent={tab === 'recent'} onClick={() => setTab('recent')}>
          Recently Viewed
        </NavTab>
      </Flex>
      <Grid
        sx={{
          gridTemplateColumns: [
            'repeat(3, minmax(280px, 1fr))',
            'repeat(3, 1fr)',
          ],
          justifyItems: 'center',
          gap: [4, 6, 8],
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {tab === 'recent' && <ProductsList handles={recentHanldes} />}
        {tab === 'stack' && <ProductsList handles={stackHandles} />}
      </Grid>
    </Container>
  )
}

export default ProductRecentRecommendations
