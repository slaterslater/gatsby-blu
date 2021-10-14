import React, { useCallback, useEffect, useState, createContext } from 'react'
import { useQuery } from 'urql'
import store from 'store'
import { SHOP_CURRENCIES } from '../queries/shop'

const STORAGE_CURRENCY_ID = 'currencyCode'

const initialValues = {
  countryCode: 'CA',
  currencyCode: 'CAD',
  setCurrencyCode: () => {},
}

export const CurrencyContext = createContext(initialValues)

const CurrencyProvider = props => {
  const [countryCode, setCountryCode] = useState(initialValues.countryCode)
  const [currencyCode, setCurrencyCode] = useState(initialValues.currencyCode)
  const [{ data }] = useQuery({ query: SHOP_CURRENCIES })

  useEffect(() => {
    const storageCurrency = store.get(STORAGE_CURRENCY_ID)

    if (storageCurrency) {
      setCurrencyCode(storageCurrency)
      setCountryCode(storageCurrency.slice(0, 2))
    }
  }, [])

  useEffect(() => {
    const storageCurrency = store.get(STORAGE_CURRENCY_ID)

    if (data && !storageCurrency) {
      store.set(STORAGE_CURRENCY_ID, data.shop.paymentSettings.currencyCode)
    }
  }, [data])

  const setCurrency = useCallback(
    code => {
      setCurrencyCode(code)
      setCountryCode(code.slice(0, 2))
      store.set(STORAGE_CURRENCY_ID, code)
    },
    [setCurrencyCode]
  )

  return (
    <CurrencyContext.Provider
      value={{ countryCode, currencyCode, setCurrency }}
      {...props}
    />
  )
}

export default CurrencyProvider
