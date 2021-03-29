import React from 'react'
import { Box } from 'theme-ui'
import LineItem from '../LineItem'

const OrderLineItem = ({ item }) => (
  <Box>
    <LineItem item={item}>price</LineItem>
  </Box>
)

export default OrderLineItem
