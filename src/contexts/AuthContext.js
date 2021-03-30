import React, { useMemo, useEffect, createContext, useState } from 'react'
import { useMutation } from 'urql'
import { DateTime } from 'luxon'
import store from 'store'
import { navigate } from '@reach/router'
import {
  CustomerAccessTokenCreate,
  CustomerAccessTokenRenew,
} from '../mutations/auth'

export const AuthContext = createContext()

const getShouldRenew = () => {
  const expiresAt = store.get('expiresAt')
  const accessToken = store.get('accessToken')

  if (!(expiresAt && accessToken)) return false

  const expiresDate = DateTime.fromISO(expiresAt)
  const now = DateTime.now()

  if (now < expiresDate) return true
}

const AuthProvider = props => {
  const [{ isLoggedIn, shouldRenew, accessToken }, setAuthState] = useState({
    accessToken: store.get('accessToken'),
    isLoggedIn: false,
    shouldRenew: getShouldRenew(),
  })

  // mutations
  const [{ data: renewData }, renewAuthToken] = useMutation(
    CustomerAccessTokenRenew
  )
  const [createTokenResponse, createAccessToken] = useMutation(
    CustomerAccessTokenCreate
  )

  // renew existing token
  useEffect(() => {
    if (shouldRenew) {
      renewAuthToken({ customerAccessToken: accessToken })
    }
  }, [shouldRenew, accessToken, renewAuthToken])

  useEffect(() => {
    if (renewData) {
      setAuthState(prev => ({
        ...prev,
        accessToken:
          renewData.customerAccessTokenRenew.customerAccessToken.accessToken,
        shouldRenew: false,
        isLoggedIn: true,
      }))
    }
  }, [renewData])

  const login = async input => {
    const { data, ...rest } = await createAccessToken({ input })
    if (data) {
      const { customerAccessToken } = data.customerAccessTokenCreate
      store.set('accessToken', customerAccessToken.accessToken)
      store.set('expiresAt', customerAccessToken.expiresAt)
      setAuthState(prev => ({
        ...prev,
        accessToken: customerAccessToken.accessToken,
        isLoggedIn: true,
      }))
    }
    return { data, ...rest }
  }

  const logout = () => {
    store.remove('accessToken')
    store.remove('expiresAt')
    setAuthState(prev => ({ ...prev, accessToken: null, isLoggedIn: false }))
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        shouldRenew,
        login,
        logout,
      }}
      {...props}
    />
  )
}

export default AuthProvider
