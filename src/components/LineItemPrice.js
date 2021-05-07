import { Grid, Text } from 'theme-ui'
import React from 'react'
import FormattedPrice from './FormattedPrice'

const getDiscountedPrice = ({
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

const LineItemPrice = ({
  originalTotalPrice,
  discountAllocations,
  ...props
}) => {
  const discountedPrice = getDiscountedPrice({
    originalTotalPrice,
    discountAllocations,
  })

  return (
    <Grid
      sx={{ display: 'inline-grid', gridAutoFlow: 'column', gap: 2 }}
      {...props}
    >
      {!!discountedPrice && (
        <Text>
          <FormattedPrice priceV2={discountedPrice} />
        </Text>
      )}
      <Text
        variant={discountedPrice ? 'strike' : ''}
        sx={{ color: discountedPrice ? 'darkGray' : 'body' }}
      >
        <FormattedPrice priceV2={originalTotalPrice} />
      </Text>
    </Grid>
  )
}

export default LineItemPrice
