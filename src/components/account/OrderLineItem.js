import React from 'react'
import { Grid, Text } from 'theme-ui'
import LineItem from '../LineItem'
import LineItemPrice from '../LineItemPrice'

const OrderLineItem = ({ item }) => (
  <Grid sx={{ gridTemplateColumns: '4fr 1fr 1fr', gap: 4 }} py={4}>
    <LineItem item={item} />
    <Text variant="caps" sx={{ justifySelf: 'center' }}>
      {item.quantity}
    </Text>
    <Text variant="caps" sx={{ justifySelf: 'end' }}>
      <LineItemPrice
        quantity={item.quantity}
        originalPrice={item.originalTotalPrice}
        discounts={item.discountAllocations}
        sx={{ display: 'grid', gridAutoFlow: 'row' }}
      />
    </Text>
  </Grid>
)

export default OrderLineItem
