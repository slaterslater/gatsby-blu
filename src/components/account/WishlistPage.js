import pluralize from 'pluralize'
import React from 'react'
import { Grid } from 'theme-ui'
import { useWishlist } from '../../hooks/wishlist'
import AccountPage from './AccountPage'
import WishlistItem from './WishlistItem'

const WishlistPage = props => {
  const [wishlist, refreshWishlist] = useWishlist()

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
      <Grid pt={4} sx={{ gridAutoFlow: 'row', gap: 4 }}>
        {wishlist.map(handle => (
          <WishlistItem
            handle={handle}
            key={handle}
            onRemove={() => refreshWishlist()}
          />
        ))}
      </Grid>
    </AccountPage>
  )
}

export default WishlistPage
