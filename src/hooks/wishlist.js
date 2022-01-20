import { useContext } from 'react'
import { post } from 'axios'
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

  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: WISHLIST_QUERY,
    variables: { customerAccessToken: accessToken },
    pause: !isLoggedIn,
  })

  const refreshWishlist = () =>
    reexecuteQuery({ requestPolicy: 'network-only' })

  const updateWishlist = async (productHandle, method) => {
    // await post(`/api/user/${data?.customer?.id || ''}/wishlist`, {
    await post(`/api/wishlist`, {
      userId: data?.customer?.id,
      productHandle,
      method,
    })
    refreshWishlist()
  }

  // separate string of handles by space
  const wishlist = data?.customer?.wishlist?.value.split(' ') || []
  return {
    wishlist,
    updateWishlist,
    refreshWishlist,
  }
}
