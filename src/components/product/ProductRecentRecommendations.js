import React, { useContext, useState } from 'react'
import { useQuery } from 'urql'
import { Box, Flex, Grid, Container, Button } from 'theme-ui'
import { useMatch } from '@reach/router'
import { RecentlyViewedProductsContext } from '../../contexts/RecentlyViewedProductsContext'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { ProductContext } from './ProductContext'
import {
  PRODUCT_ITEM_QUERY,
  PRODUCT_ITEM_QUERY_BY_ID,
} from '../../queries/product'
import ProductListItem from './ListItem'
import ProductModal from './ProductModal'
import { useShopifyImage } from '../../hooks/shopifyImage'

const Recent = ({ value }) => {
  const { countryCode } = useContext(CurrencyContext)
  const isId = value?.startsWith('gid:')
  const params = {
    query: isId ? PRODUCT_ITEM_QUERY_BY_ID : PRODUCT_ITEM_QUERY,
    variables: { ...(isId ? { id: value } : { handle: value }), countryCode },
  }
  const [{ data }] = useQuery(params)
  if (!data?.product) return false

  const {
    product: {
      title,
      images,
      priceRangeV2: { maxVariantPrice, minVariantPrice },
      availableForSale,
      tags,
      byAppointmentOnly,
    },
  } = data

  const [formatTitle] = title.toLowerCase().split(' - ')
  const [price, hasRange] =
    byAppointmentOnly?.value === 'true'
      ? [{ amount: '' }, false]
      : [minVariantPrice, maxVariantPrice.amount !== minVariantPrice.amount]

  // const firstImage = useShopifyImage({
  //   image: images.edges[0]?.node,
  //   width: 360,
  // })

  // console.log({ firstImage })
  // const image1 = images.edges[0]?.node
  // const [firstImage, secondImage] = [0,1].map(n => {
  //   const image = images.edges[n]?.node
  //   return useShopifyImage({ image, width: 360 })})
  return (
    <Box sx={{ scrollSnapAlign: 'start' }}>
      <ProductModal handle={data.product.handle}>
        <ProductListItem
          firstImage={images.edges[0]?.node}
          secondImage={images.edges[1]?.node}
          title={formatTitle}
          price={price}
          hasRange={hasRange}
          availableForSale={availableForSale}
          tags={tags}
        />
      </ProductModal>
    </Box>
  )
}

const useRecentlyViewedHandles = () => {
  const recentlyViewed = useContext(RecentlyViewedProductsContext)
  const { handle } = useMatch('/products/:handle') || {}

  return recentlyViewed?.filter(recent => recent !== handle).slice(0, 3) || []
}

const useStackHandlesAndIds = () => {
  const {
    product: { tags, metafields },
  } = useContext(ProductContext)

  // return stackwith values from metafield or tags
  const [stackWithIds] = metafields?.filter(field => field.key === 'stack_with')
  if (stackWithIds) return JSON.parse(stackWithIds.value)
  return tags
    ?.filter(tag => tag.includes('__with'))
    .map(tag => tag.split(':')[1])
}

const NavTab = ({ isCurrent, ...props }) => (
  <Button
    variant="caps"
    pb={1}
    sx={{
      fontWeight: 400,
      borderBottom: '1px solid',
      borderColor: isCurrent ? 'black' : 'transparent',
      textTransform: 'uppercase',
      fontFamily: 'heading',
      backgroundColor: 'transparent',
      color: 'primary',
      fontSize: 4,
      borderRadius: 0,
      letterSpacing: 'widest',
      textAlign: 'center',
      padding: 0,
      cursor: 'pointer',
    }}
    {...props}
  />
)

const ProductsList = ({ values }) =>
  values.map(value => <Recent value={value} key={`recent-${value}`} />)

const ProductRecentRecommendations = () => {
  const stackValues = useStackHandlesAndIds()
  const recentValues = useRecentlyViewedHandles()

  const [tab, setTab] = useState('stack')

  return (
    <Container
      id="recommendations"
      px={[0, 6, 7]}
      ml={[0, 'auto']}
      mr={[-5, 'auto']}
    >
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
        {tab === 'recent' && <ProductsList values={recentValues} />}
        {tab === 'stack' && <ProductsList values={stackValues} />}
      </Grid>
    </Container>
  )
}

export default ProductRecentRecommendations
