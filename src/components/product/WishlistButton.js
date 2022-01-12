import React, { useState, useContext } from 'react'
import { post } from 'axios'
import { IconButton, Text } from 'theme-ui'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { navigate } from 'gatsby'
import { useCurrentUser } from '../../hooks/user'
import { ProductContext } from './ProductContext'
import { useWishlist } from '../../hooks/wishlist'
import { AuthContext } from '../../contexts/AuthContext'

const WishlistButton = props => {
  const [loading, setLoading] = useState(false)
  const {
    product: { handle },
  } = useContext(ProductContext)
  const { isLoggedIn } = useContext(AuthContext)
  const [{ data }] = useCurrentUser()
  const [wishlist, refreshWishlist] = useWishlist()
  const isListed = wishlist.includes(handle)

  const updateWishlist = async method => {
    setLoading(true)
    await post(`/api/user/${data?.customer?.id || ''}/wishlist`, {
      productHandle: handle,
      method,
    })
    await refreshWishlist()
    setLoading(false)
  }

  const handleClick = () => {
    if (isLoggedIn) {
      updateWishlist(isListed ? 'DELETE' : 'POST')
    } else {
      navigate('/account/login', {
        state: { toOrigin: window.location.pathname },
      })
    }
  }

  return (
    <IconButton
      type="button"
      onClick={handleClick}
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
