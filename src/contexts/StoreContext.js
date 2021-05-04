import React, { useContext, createContext, useEffect, useState } from 'react'
import Client from 'shopify-buy'
import { useQuery, useMutation } from 'urql'
import { CreateCheckout } from '../mutations/cart'
import { CHECKOUT_QUERY } from '../queries/checkout'
import { CurrencyContext } from './CurrencyContext'

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

const StoreProvider = props => {
  const { currencyCode } = useContext(CurrencyContext)
  const [checkoutId, setCheckoutId] = useState(initialValues.checkoutId)

  const [{ data, fetching, error }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
    pause: !checkoutId,
  })

  const [createResult, createCheckout] = useMutation(CreateCheckout)

  useEffect(() => {
    // when the component mounts
    const currentCheckoutId = localStorage.getItem(STORAGE_CHECKOUT_ID)
    if (!currentCheckoutId) {
      createCheckout({ presentmentCurrencyCode: currencyCode })
    } else {
      setCheckoutId(currentCheckoutId)
    }
  }, [])

  useEffect(() => {
    // if we created a new checkout, update the checkout id
    if (createResult.data) {
      const {
        checkoutCreate: {
          checkout: { id },
        },
      } = createResult.data
      // set id in state
      setCheckoutId(id)
      // store checkout id
      localStorage.setItem(STORAGE_CHECKOUT_ID, id)
    }
  }, [createResult])

  useEffect(() => {
    // if currency code is defined and if currency code is different than the one in the checkout
    // copy previous line items
    // create a new checkout with the new currency code and the previous line items
    // store the new checkout as the checkout
  }, [currencyCode])

  return (
    <StoreContext.Provider
      value={{
        ...initialValues,
        checkoutId,
      }}
      {...props}
    />
  )
}

export default StoreProvider
