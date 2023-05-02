// src/components/product/RelatedProducts.js

import { Box, Heading, Grid } from 'theme-ui'
import React, { useContext } from 'react'
import { useQuery } from 'urql'
import PropTypes from 'prop-types'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ProductListItem from './ListItem'
import ProductModal from './ProductModal'

const Product = ({ handle }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (!data?.product) return false

  const [title] = data.product.title.split(' - ')
  const hasRange =
    data.product.priceRangeV2.maxVariantPrice.amount !==
    data.product.priceRangeV2.minVariantPrice.amount

  return (
    <Box sx={{ scrollSnapAlign: 'start' }}>
      <ProductModal handle={handle}>
        <ProductListItem
          firstImage={data.product.images.edges[0]?.node}
          secondImage={data.product.images.edges[1]?.node}
          title={title}
          price={data.product.priceRangeV2.minVariantPrice}
          hasRange={hasRange}
          availableForSale={data.product.availableForSale}
          tags={data.product.tags}
        />
      </ProductModal>
    </Box>
  )
}

const RelatedProducts = ({ related }) => {
  if (!related) return <></>
  return (
    <>
      <Heading as="h3" variant="caps" mt={3} pl={2}>
        Related Products
      </Heading>
      <Grid
        sx={{
          gridTemplateColumns: '1fr 1fr',
          justifyItems: 'center',
          gap: 1,
        }}
      >
        {related.map(handle => (
          <Product key={`related-${handle}`} handle={handle} />
        ))}
      </Grid>
    </>
  )
}

Product.propTypes = {
  handle: PropTypes.string.isRequired,
}

RelatedProducts.propTypes = {
  related: PropTypes.arrayOf(PropTypes.string),
}

export default RelatedProducts
