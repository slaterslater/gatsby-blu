import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../contexts/AuthContext'

const AuthenticatedRoute = ({ component: Component, location, ...props }) => {
  const { isLoggedIn, shouldRenew } = useContext(AuthContext)

  if (!shouldRenew && !isLoggedIn) navigate('/account/login')

  if (isLoggedIn) return <Component {...props} />

  return null
}

export default AuthenticatedRoute
