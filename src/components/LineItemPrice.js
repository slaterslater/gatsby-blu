import { Grid, Text } from 'theme-ui'
import React from 'react'
import FormattedPrice from './FormattedPrice'

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

const LineItemPrice = ({
  item,
  originalTotalPrice,
  discountAllocations,
  ...props
}) => {
  if (item) return <FormattedPrice priceV2={item.variant?.priceV2 || {}} />
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
