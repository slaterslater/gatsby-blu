import { Grid, Text } from 'theme-ui'
import React from 'react'
import FormattedPrice from './FormattedPrice'

// handle discount allocations
export const getDiscountedPrice = (quantity, originalPrice, discounts = []) => {
  if (!discounts.length) return undefined
  const discountTotal = discounts.reduce(
    (total, discount) => total + discount.discountedAmount.amount,
    0
  )
  return {
    ...originalPrice,
    amount: quantity * originalPrice.amount - discountTotal,
  }
}

const LineItemPrice = ({ quantity, originalPrice, discounts, ...props }) => {
  if (!discounts.length) return <FormattedPrice priceV2={originalPrice} />

  const discountedPrice = getDiscountedPrice(quantity, originalPrice, discounts)
  const discountTitle = discounts[0].discountApplication?.title

  const price = {
    ...originalPrice,
    amount: quantity * originalPrice.amount
  }

  return (
    <>
      <Grid
        sx={{ display: 'inline-grid', gridAutoFlow: 'column', gap: 2 }}
        {...props}
      >
        <Text
          variant={discountedPrice ? 'strike' : ''}
          sx={{ color: discountedPrice ? 'darkGray' : 'body' }}
        >
          <FormattedPrice priceV2={price} />
        </Text>
        {discountedPrice && (
          <Text>
            <FormattedPrice priceV2={discountedPrice} />
          </Text>
        )}
      </Grid>
      {discountTitle && (
        <Text as="p" sx={{ fontSize: 0 }}>
          {discountTitle}
        </Text>
      )}
    </>
  )
}

export default LineItemPrice
