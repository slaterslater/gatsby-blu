import { Grid, Text } from 'theme-ui'
import React from 'react'
import FormattedPrice from './FormattedPrice'
import { useVariantPresentmentPrice } from '../hooks/variant'

// handle discount allocations
export const getDiscountedPrice = (
  originalTotalPrice,
  discountAllocations = []
) => {
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

const LineItemPrice = ({
  item,
  originalTotalPrice,
  discountAllocations,
  ...props
}) => {
  if (item) return <VariantPrice item={item} />
  const discountedPrice = getDiscountedPrice(
    originalTotalPrice,
    discountAllocations
  )
  return (
    <Grid
      sx={{ display: 'inline-grid', gridAutoFlow: 'column', gap: 2 }}
      {...props}
    >
      <Text
        variant={discountedPrice ? 'strike' : ''}
        sx={{ color: discountedPrice ? 'darkGray' : 'body' }}
      >
        <FormattedPrice priceV2={originalTotalPrice} />
      </Text>
      {discountedPrice && (
        <Text>
          <FormattedPrice priceV2={discountedPrice} />
        </Text>
      )}
    </Grid>
  )
}

export default LineItemPrice
