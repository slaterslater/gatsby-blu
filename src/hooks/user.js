import { useContext } from 'react'
import { useQuery } from 'urql'
import { AuthContext } from '../contexts/AuthContext'
import { USER_QUERY } from '../queries/user'

export function useCurrentUser() {
  const { accessToken, isLoggedIn } = useContext(AuthContext)

  return useQuery({
    query: USER_QUERY,
    variables: { customerAccessToken: accessToken },
    pause: !isLoggedIn,
  })
}
