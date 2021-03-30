import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../contexts/AuthContext'

const AuthenticatedRoute = ({ component: Component, location, ...props }) => {
  const { isLoggedIn, shouldRenew } = useContext(AuthContext)

  useEffect(() => {
    if (!shouldRenew && !isLoggedIn) {
      navigate('/account/login')
    }
  }, [shouldRenew, isLoggedIn])

  if (isLoggedIn) return <Component {...props} />

  return null
}

export default AuthenticatedRoute
