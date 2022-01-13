import pluralize from 'pluralize'
import React from 'react'
import { Grid } from 'theme-ui'
import { useWishlist } from '../../hooks/wishlist'
import AccountPage from './AccountPage'
import WishlistItem from './WishlistItem'

const WishlistPage = props => {
  const { wishlist } = useWishlist()

  return (
    <AccountPage
      title="Wishlist"
      // subtitle={`${pluralize(
      //   'items',
      //   wishlist?.length || 0,
      //   true
      // )} in your wishlist`}
      currentPage={{ text: 'Wishlist', path: '/account/wishlist' }}
    >
      <Grid
        pt={4}
        sx={{
          maxWidth: 1200,
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
          gap: [1, 3],
        }}
      >
        {wishlist.map(handle => (
          <WishlistItem handle={handle} key={handle} />
        ))}
      </Grid>
    </AccountPage>
  )
}

export default WishlistPage
