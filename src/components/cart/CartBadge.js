import { Flex } from 'theme-ui'
import React, { useContext } from 'react'
import { useQuery } from 'urql'
import { StoreContext } from '../../contexts/StoreContext'
import { CART_QUERY } from '../../queries/checkout'

const CartBadge = props => {
  const { cartId } = useContext(StoreContext)
  const [{ data, fetching }] = useQuery({
    query: CART_QUERY,
    variables: { cartId },
  })

  if (!data && fetching) return false

  const itemCount = data?.cart?.lines?.nodes?.reduce(
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
