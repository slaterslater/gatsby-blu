import { useContext } from 'react'
// import { post } from 'axios'
import axios from 'axios'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
import { AuthContext } from '../contexts/AuthContext'

export const WISHLIST_QUERY = gql`
  query WishlistQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      wishlist: metafield(namespace: "my_fields", key: "wishlist") {
        id
        value
      }
    }
  }
`

export function useWishlist() {
  const { accessToken, isLoggedIn } = useContext(AuthContext)

  const [{ data }, reexecuteQuery] = useQuery({
    query: WISHLIST_QUERY,
    variables: { customerAccessToken: accessToken },
    pause: !isLoggedIn,
  })

  const URL = '/api/wishlist'
  const userId = data?.customer?.id

  const refreshWishlist = () =>
    reexecuteQuery({ requestPolicy: 'network-only' })

  const addToWishlist = async productHandle => {
    await axios.post(URL, {
      userId,
      productHandle,
    })
    refreshWishlist()
  }
  const removeFromWishlist = async productHandle => {
    await axios.delete(URL, {
      data: {
        userId,
        productHandle,
      },
    })
    refreshWishlist()
  }

  // separate string of handles by space
  const wishlist = data?.customer?.wishlist?.value.split(' ') || []
  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    refreshWishlist,
  }
}
