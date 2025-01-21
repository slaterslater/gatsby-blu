import React, { useContext, createContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from 'urql'
import store from 'store'
import { CartCreate, CreateCheckout } from '../mutations/cart'
import { CHECKOUT_QUERY } from '../queries/checkout'
import { CurrencyContext } from './CurrencyContext'

const STORAGE_CHECKOUT_ID = 'checkoutId'

const initialValues = {
  cart: [],
  addProductToCart: () => {},
  checkoutId: undefined,
}

export const StoreContext = createContext(initialValues)

const StoreProvider = props => {
  const { currencyCode, countryCode } = useContext(CurrencyContext)
  const [checkoutId, setCheckoutId] = useState(initialValues.checkoutId)

  const [{ data, fetching, error }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
    pause: !checkoutId,
  })

  const [createResult, createCheckout] = useMutation(CreateCheckout)
  // const [createResult, createCheckout] = useMutation(CartCreate)

  const createCheckoutAndStoreId = async checkoutVariables => {
    try {
      const { data, error } = await createCheckout({
        ...checkoutVariables,
        // lines: [],
        countryCode,
        buyerIdentity: { countryCode },
      })

      // console.log('create', {data})
      if (data) {
        const { id } = data.checkoutCreate.checkout
        setCheckoutId(id)
        store.set(STORAGE_CHECKOUT_ID, id)
      }
    } catch (e) {
      console.error('error creating checkout', {e})
    }
  }

  useEffect(() => {
    if ((!fetching && !data && error) || (data && !data.checkout)) {
      // if we couldn't fetch the checkout id remove it and create another one
      store.remove('checkoutId')
      createCheckoutAndStoreId()
    }

    if (!fetching && data?.checkout?.completedAt) {
      store.remove('checkoutId')
      createCheckoutAndStoreId()
    }
  }, [data, error, fetching])

  useEffect(() => {
    // when the component mounts
    const currentCheckoutId = store.get(STORAGE_CHECKOUT_ID)
    if (!currentCheckoutId) {
      createCheckoutAndStoreId()
    } else {
      setCheckoutId(currentCheckoutId)
    }
  }, [])

  const dataCheckoutId = data?.checkout?.id

  useEffect(() => {
    const replaceCheckout = async () => {
      console.log('replacing checkout')

      const { lineItems } = data.checkout

      const nextLineItems = lineItems.nodes.map(
        ({ variant, quantity, customAttributes }) => {
          const item = {
            variantId: variant.id,
            quantity,
          }

          if (customAttributes.length) {
            item.customAttributes = customAttributes.map(({ key, value }) => ({
              key,
              value,
            }))
          }

          return item
        }
      )

      createCheckoutAndStoreId({
        lineItems: nextLineItems,
      })
    }
    if (
      currencyCode !== undefined &&
      dataCheckoutId &&
      data.checkout.totalPriceV2.currencyCode !== currencyCode
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
