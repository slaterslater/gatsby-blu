import React, { createContext, useEffect, useState } from 'react'
import Client from 'shopify-buy'

const STORAGE_CHECKOUT_ID = 'checkoutId'

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_SHOP_NAME,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
})

const initialValues = {
  cart: [],
  addProductToCart: () => {},
  client,
  checkoutId: undefined,
}

export const StoreContext = createContext(initialValues)

const getNewCheckout = async () => {
  let newCheckout
  try {
    newCheckout = await client.checkout.create()
    localStorage.setItem(STORAGE_CHECKOUT_ID, newCheckout.id)
  } catch (e) {
    console.error(e)
  }
  return newCheckout
}

const StoreProvider = props => {
  const [checkoutId, setCheckoutId] = useState(initialValues.checkoutId)
  const [checkout, setCheckout] = useState(initialValues.checkout)

  const initializeCheckout = async () => {
    try {
      const isBrowser = typeof window !== undefined

      const currentCheckoutId = isBrowser
        ? localStorage.getItem(STORAGE_CHECKOUT_ID)
        : null

      let newCheckout = null
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout.completedAt) {
          newCheckout = await getNewCheckout()
        }
      } else {
        newCheckout = await getNewCheckout()
      }
      setCheckout(newCheckout)
      setCheckoutId(newCheckout.id)
    } catch (e) {
      console.log('initialize checkout error')
    }
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        ...initialValues,
        checkout,
        checkoutId,
      }}
      {...props}
    />
  )
}

export default StoreProvider
