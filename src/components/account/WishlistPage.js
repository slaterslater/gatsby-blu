import pluralize from 'pluralize'
import { Box, Text } from 'theme-ui'
import React from 'react'
import { useWishlist } from '../../hooks/wishlist'
import AccountPage from './AccountPage'

const WishlistPage = props => {
  const wishlist = useWishlist()

  return (
    <AccountPage
      title="Wishlist"
      subtitle={`${pluralize(
        'items',
        wishlist?.length || 0,
        true
      )} in your wishlist`}
      currentPage={{ text: 'Wishlist', path: '/account/wishlist' }}
    >
      {wishlist.map(handle => (
        <Box key={handle}>
          <Text>{handle}</Text>
        </Box>
      ))}
    </AccountPage>
  )
}

export default WishlistPage
