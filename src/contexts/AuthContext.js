import React, { useEffect, useMemo, createContext, useState } from 'react'
import { useMutation } from 'urql'
import { DateTime } from 'luxon'
import { CustomerAccessTokenRenew } from '../mutations/auth'

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  expiresAt: localStorage.getItem('expiresAt'),
  loggedIn: false,
}

export const AuthContext = createContext()

const AuthProvider = props => {
  const [{ accessToken, expiresAt, loggedIn }, setAuthState] = useState(
    initialState
  )
  const [{ data }, renewAuthToken] = useMutation(CustomerAccessTokenRenew)

  useEffect(() => {
    if (accessToken && expiresAt) {
      const expiresDate = DateTime.fromISO(expiresAt)
      const now = DateTime.now()

      if (now < expiresDate) {
        renewAuthToken(accessToken)
      }
    }
  }, [])

  useEffect(() => {
    if (data) {
      const customerAccessToken = data.customerAccessTokenCreate

      setAuthState(prev => ({
        ...prev,
        accessToken: customerAccessToken.accessToken,
        expiresAt: customerAccessToken.expiresAt,
        loggedIn: true,
      }))
      localStorage.setItem('accessToken')
      localStorage.setItem('expiresAt')
    }
  }, [data])

  // return isLogged in, accessToken, log out

  const value = useMemo(() => ({}), [accessToken, expiresAt])

  return <AuthContext.Provider value={value} {...props} />
}

export default AuthProvider
