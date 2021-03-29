import React from 'react'
import { Grid, Box, Text } from 'theme-ui'
import LineItem from '../LineItem'
import LineItemPrice from '../LineItemPrice'
import FormattedPrice from '../util/FormattedPrice'

const OrderLineItem = ({ item }) => (
  <Grid sx={{ gridTemplateColumns: '4fr 1fr 1fr', gap: 4 }} py={4}>
    <LineItem item={item} />
    <Text variant="caps" sx={{ justifySelf: 'center' }}>
      {item.quantity}
    </Text>
    <Text variant="caps" sx={{ justifySelf: 'end' }}>
      <LineItemPrice
        originalTotalPrice={item.originalTotalPrice}
        discountAllocations={item.discountAllocations}
        sx={{ display: 'grid', gridAutoFlow: 'row' }}
      />
    </Text>
  </Grid>
)

export default OrderLineItem
