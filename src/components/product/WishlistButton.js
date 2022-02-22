import React, { useState, useContext, useEffect } from 'react'
import { IconButton, Text } from 'theme-ui'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { navigate } from 'gatsby'
import { ProductContext } from './ProductContext'
import { useWishlist } from '../../hooks/wishlist'
import { AuthContext } from '../../contexts/AuthContext'

const WishlistButton = () => {
  const {
    product: { handle },
  } = useContext(ProductContext)
  const { isLoggedIn } = useContext(AuthContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const isListed = wishlist.includes(handle)
  const [isHeartFull, setIsHeartFull] = useState(isListed)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsHeartFull(isListed)
  }, [isListed])

  const handleClick = async () => {
    if (isLoggedIn) {
      setLoading(true)
      setIsHeartFull(!isHeartFull)
      const updateWishlist = isListed ? removeFromWishlist : addToWishlist
      await updateWishlist(handle)
      setLoading(false)
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
      mt="auto"
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
        as={isHeartFull ? IoIosHeart : IoIosHeartEmpty}
        size={20}
        color="white"
      />
    </IconButton>
  )
}

export default WishlistButton
