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
  checkout: { lineItems: [] },
}

export const StoreContext = createContext(initialValues)

const StoreProvider = props => {
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

      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
    } catch (e) {
      console.log('add to cart error')
    }
  }

  const updateLineItem = async ({ lineItemId, quantity }) => {
    try {
      const lineItems = [
        {
          id: lineItemId,
          quantity,
        },
      ]

      const newCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
    } catch (e) {}
  }

  return (
    <StoreContext.Provider
      value={{ ...initialValues, checkout, addProductToCart, updateLineItem }}
      {...props}
    />
  )
}

export default StoreProvider
