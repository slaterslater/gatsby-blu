import React, { createContext, useEffect, useState } from 'react'
import Client from 'shopify-buy'

const STORAGE_CHECKOUT_ID = 'checkoutId'

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_SHOP_NAME,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_KEY,
})

const initialValues = { cart: [], addProductToCart: () => {}, client }

export const StoreContext = createContext(initialValues)

const StoreProvider = props => {
  const [checkout, setCheckout] = useState({})

  const initializeCheckout = async () => {
    try {
      const isBrowser = typeof window !== undefined

      const currentCheckoutId = isBrowser
        ? localStorage.getItem(STORAGE_CHECKOUT_ID)
        : null

      let newCheckout = null
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        newCheckout = await client.checkout.create()
        localStorage.setItem(STORAGE_CHECKOUT_ID, newCheckout.id)
      }
      setCheckout(newCheckout)
    } catch (e) {
      console.log('initialize checkout error')
    }
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]

      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
    } catch (e) {}
  }

  return (
    <StoreContext.Provider
      value={{ ...initialValues, addProductToCart }}
      {...props}
    />
  )
}

export default StoreProvider
