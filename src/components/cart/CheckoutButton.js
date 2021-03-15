import React from 'react'
import { Button, Flex } from 'theme-ui'

const CheckoutButton = props => (
  <Flex p={4}>
    <Button type="button" sx={{ flex: 1 }}>
      Checkout
    </Button>
  </Flex>
)

export default CheckoutButton
