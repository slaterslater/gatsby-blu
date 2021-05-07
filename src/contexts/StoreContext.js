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

  const createCheckoutAndStoreId = async checkoutVariables => {
    try {
      const { data, error } = await createCheckout(checkoutVariables)

      const { id } = data.checkoutCreate.checkout
      setCheckoutId(id)
      localStorage.setItem(STORAGE_CHECKOUT_ID, id)
    } catch (e) {
      console.error('error creating checkout')
    }
  }

  useEffect(() => {
    // when the component mounts
    const currentCheckoutId = localStorage.getItem(STORAGE_CHECKOUT_ID)
    if (!currentCheckoutId) {
      createCheckoutAndStoreId({ presentmentCurrencyCode: currencyCode })
    } else {
      setCheckoutId(currentCheckoutId)
    }
  }, [])

  const dataCheckoutId = data?.node.id

  useEffect(() => {
    const replaceCheckout = async () => {
      console.log('replacing checkout')

      const { lineItems } = data.node

      const nextLineItems = lineItems.edges.map(({ node }) => {
        const item = {
          variantId: node.variant.id,
          quantity: node.quantity,
        }

        if (node.customAttributes.length) {
          item.customAttributes = node.customAttributes.map(
            ({ key, value }) => ({ key, value })
          )
        }

        return item
      })

      createCheckoutAndStoreId({
        lineItems: nextLineItems,
        presentmentCurrencyCode: currencyCode,
      })
    }
    if (
      currencyCode !== undefined &&
      dataCheckoutId &&
      data.node.totalPriceV2.currencyCode !== currencyCode
    ) {
      replaceCheckout()
      // create a new checkout with the new currency code and the previous line items
      // store the new checkout as the checkout
    }
  }, [dataCheckoutId, currencyCode])

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
