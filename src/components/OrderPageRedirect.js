import React from 'react'
import { useLocation, useMatch } from '@reach/router'

const OrderPageRedirect = props => {
  const location = useLocation()
  const match = useMatch('/:customerId/orders/:orderId/authenticate')

  if (match && location) {
    if (location.href.includes('staging')) {
      window.location.href = location.href.replace(
        'staging',
        'checkout-staging'
      )
    } else {
      window.location.href = location.href.replace('www', 'checkout')
    }
  }

  return null
}

export default OrderPageRedirect
