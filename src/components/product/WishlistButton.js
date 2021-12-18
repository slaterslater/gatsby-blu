import React, { useState, useContext } from 'react'
import { post } from 'axios'
import { Button } from 'theme-ui'
import { useCurrentUser } from '../../hooks/user'
import { ProductContext } from './ProductContext'
import { useWishlist } from '../../hooks/wishlist'

const WishlistButton = props => {
  const [loading, setLoading] = useState(false)
  const {
    product: { handle },
  } = useContext(ProductContext)
  const [{ data }] = useCurrentUser()
  const [, refreshWishlist] = useWishlist()

  const addToWishlist = async () => {
    setLoading(true)
    await post(`/api/user/${data?.customer?.id || ''}/wishlist`, {
      productHandle: handle,
    })
    await refreshWishlist()
    setLoading(false)
  }
  return (
    <Button type="button" onClick={addToWishlist} disabled={loading}>
      Add To Wishlist
    </Button>
  )
}

export default WishlistButton
