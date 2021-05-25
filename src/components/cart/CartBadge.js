import { Box, Flex } from 'theme-ui'
import React, { useContext } from 'react'
import { useQuery } from 'urql'
import { StoreContext } from '../../contexts/StoreContext'
import { CHECKOUT_QUERY } from '../../queries/checkout'

const CartBadge = props => {
  const { checkoutId } = useContext(StoreContext)
  const [{ data, fetching }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
  })

  if (!data && fetching) return false

  const itemCount = data?.node?.lineItems?.edges?.reduce(
    (acc, { node }) => acc + node.quantity,
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
