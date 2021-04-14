import React from 'react'
import { Link } from 'gatsby'
import { Button, Flex } from 'theme-ui'

const CheckoutButton = props => (
  <Flex p={4}>
    <Button as={Link} to="/cart" type="button" sx={{ flex: 1 }}>
      Checkout
    </Button>
  </Flex>
)

export default CheckoutButton
