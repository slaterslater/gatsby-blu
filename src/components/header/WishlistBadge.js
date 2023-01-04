import { Box, Flex } from 'theme-ui'
import React from 'react'
import { useWishlist } from '../../hooks/wishlist'

const WishlistBadge = props => {
  const { wishlist } = useWishlist()

  if (!wishlist.length) return false

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
        transform: 'translateX(15%) translateY(-10%)',
      }}
    >
      {wishlist.length}
    </Flex>
  )
}

export default WishlistBadge
