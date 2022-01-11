import React, { useState, useContext } from 'react'
import { post } from 'axios'
import { IconButton, Text } from 'theme-ui'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { navigate } from 'gatsby'
import { useCurrentUser } from '../../hooks/user'
import { ProductContext } from './ProductContext'
import { useWishlist } from '../../hooks/wishlist'

const WishlistButton = props => {
  const [loading, setLoading] = useState(false)
  const {
    product: { handle },
  } = useContext(ProductContext)
  const [{ data }] = useCurrentUser()
  const [wishlist, refreshWishlist] = useWishlist()

  const addToWishlist = async () => {
    setLoading(true)
    await post(`/api/user/${data?.customer?.id || ''}/wishlist`, {
      productHandle: handle,
    })
    await refreshWishlist()
    setLoading(false)
  }

  const isListed = wishlist.includes(handle)

  return (
    <IconButton
      type="button"
      onClick={isListed ? () => navigate('/account/wishlist') : addToWishlist}
      disabled={loading}
      sx={{
        opacity: loading ? 0.8 : 1,
        transition: 'opacity .3s ease',
        bg: 'primary',
        borderRadius: 0,
        width: 48,
        height: 47,
        color: 'white',
        cursor: 'pointer',
      }}
    >
      <Text
        as={isListed ? IoIosHeart : IoIosHeartEmpty}
        size={20}
        color="white"
      />
    </IconButton>
  )
}

export default WishlistButton
