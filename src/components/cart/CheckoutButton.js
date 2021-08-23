import React from 'react'
// import { Link } from 'gatsby'
import { Button, Flex, Link } from 'theme-ui'

const CheckoutButton = ({ href }) => (
  <Flex p={4} pb={6}>
    <Button as={Link} href={href} type="button" sx={{ flex: 1 }}>
      Checkout
    </Button>
  </Flex>
)

export default CheckoutButton
