import { Box, Flex } from 'theme-ui'
import React, { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'

const CartBadge = props => {
  const { checkout } = useContext(StoreContext)

  const itemCount = checkout.lineItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  if (!itemCount) return false

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 16,
        width: 16,
        bg: 'lightBlueGray',
        fontSize: 0,
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translateX(25%) translateY(-10%)',
      }}
    >
      {itemCount}
    </Flex>
  )
}

export default CartBadge
