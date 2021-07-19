import { Grid, Text } from 'theme-ui'
import React from 'react'
import FormattedPrice from './FormattedPrice'
import { useVariantPresentmentPrice } from '../hooks/variant'

// handle discount allocations
export const getDiscountedPrice = ({
  originalTotalPrice,
  discountAllocations = [],
}) => {
  if (!discountAllocations.length) return undefined

  const discountTotal = discountAllocations.reduce(
    (acc, el) => acc + el.allocatedAmount.amount,
    0
  )

  return {
    ...originalTotalPrice,
    amount: originalTotalPrice.amount - discountTotal,
  }
}

const VariantPrice = ({ item }) => {
  const presentmentPrice = useVariantPresentmentPrice(item.variant)

  return <FormattedPrice priceV2={presentmentPrice || {}} />
}

const LineItemPrice = ({ item, ...props }) => {
  // handle discount allocations
  const discountedPrice = false

  return (
    <Grid
      sx={{ display: 'inline-grid', gridAutoFlow: 'column', gap: 2 }}
      {...props}
    >
      {/* {!!discountedPrice && ( */}
      {/*   <Text> */}
      {/*     <FormattedPrice priceV2={discountedPrice} /> */}
      {/*   </Text> */}
      {/* )} */}
      <Text
        variant={discountedPrice ? 'strike' : ''}
        sx={{ color: discountedPrice ? 'darkGray' : 'body' }}
      >
        {!!item.variant && <VariantPrice item={item} />}
      </Text>
    </Grid>
  )
}

export default LineItemPrice
