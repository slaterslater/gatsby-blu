import React, { useContext, createContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from 'urql'
import store from 'store'
import { CartCreate } from '../mutations/cart'
import { CART_QUERY, CHECKOUT_QUERY } from '../queries/checkout'
import { CurrencyContext } from './CurrencyContext'

const STORAGE_CART_ID = 'cartId'

const initialValues = {
  cart: [],
  addProductToCart: () => {},
  cartId: undefined,
}

export const StoreContext = createContext(initialValues)

const StoreProvider = props => {
  const { currencyCode, countryCode } = useContext(CurrencyContext)
  const [cartId, setCartId] = useState(initialValues.cartId)

  const [{ data, fetching, error }] = useQuery({
    query: CART_QUERY,
    variables: { cartId },
    pause: !cartId,
  })

  // console.log({data}) // remove

  const [createResult, createCheckout] = useMutation(CartCreate)

  const createCheckoutAndStoreId = async checkoutVariables => {
    try {
      const { data, error } = await createCheckout({
        ...checkoutVariables,
        countryCode,
        buyerIdentity: { countryCode },
      })

      if (data) {
        const { id } = data.cartCreate.cart
        setCartId(id)
        store.set(STORAGE_CART_ID, id)
      }
    } catch (e) {
      console.error('error creating checkout', {e})
    }
  }

  useEffect(() => {
    if ((!fetching && !data && error) || (data && !data.cart)) {
      // if we couldn't fetch the checkout id remove it and create another one
      store.remove(STORAGE_CART_ID)
      createCheckoutAndStoreId()
    }

    /*
    will have to use this for 
query($checkoutId: ID!) {
  order(id: $checkoutId) {
    id
    createdAt
    financialStatus
  }
}
    */

    if (!fetching && data?.checkout?.completedAt) { // this needs to be updated as cart doesn't have completedAt
      store.remove('checkoutId')
      createCheckoutAndStoreId()
    }
  }, [data, error, fetching])

  useEffect(() => {
    // when the component mounts
    const currentCartId = store.get(STORAGE_CART_ID)
    if (!currentCartId) {
      createCheckoutAndStoreId()
    } else {
      setCartId(currentCartId)
    }
  }, [])

  const dataCartId = data?.cart?.id

  useEffect(() => {
    const replaceCheckout = async () => {
      console.log('replacing cart')

      const { lines } = data.cart

      // const nextLineItems = lines.nodes.map(
      //   ({ variant, quantity, attributes }) => {
      //     const item = {
      //       variantId: variant.id,
      //       quantity,
      //     }

      //     if (customAttributes.length) {
      //       item.customAttributes = customAttributes.map(({ key, value }) => ({
      //         key,
      //         value,
      //       }))
      //     }

      //     return item
      //   }
      // )

      createCheckoutAndStoreId({
        // lines: nextLineItems,
        lines: []
      })
    }

    const cartCurrency = data?.cart.cost.totalAmount.currencyCode
    const isValidCurrency = currencyCode !== undefined && (cartCurrency === currencyCode || cartCurrency === 'XXX')
    
    if (dataCartId && !isValidCurrency) {
    // if (
    //   currencyCode !== undefined &&
    //   dataCartId &&
    //   data?.cart.cost.totalAmount.currencyCode !== currencyCode
    // ) {
      replaceCheckout()
      // create a new checkout with the new currency code and the previous line items
      // store the new checkout as the checkout
    }
  }, [dataCartId, currencyCode])

  return (
    <StoreContext.Provider
      value={{
        ...initialValues,
        cartId,
      }}
      {...props}
    />
  )
}

export default StoreProvider
