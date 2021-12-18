import { useContext } from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
import { AuthContext } from '../contexts/AuthContext'

export const WISHLIST_QUERY = gql`
  query WishlistQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      wishlist: metafield(namespace: "my_fields", key: "wishlist") {
        id
        value
      }
    }
  }
`

export function useWishlist() {
  const { accessToken, isLoggedIn } = useContext(AuthContext)

  const [{ data, error, loading }, reexecuteQuery] = useQuery({
    query: WISHLIST_QUERY,
    variables: { customerAccessToken: accessToken },
    pause: !isLoggedIn,
  })

  if (data?.customer?.wishlist?.value) {
    // separate string of handles by space
    return [
      data.customer.wishlist.value.split(' '),
      () => reexecuteQuery({ requestPolicy: 'network-only' }),
    ]
  }

  return [[]]
}
