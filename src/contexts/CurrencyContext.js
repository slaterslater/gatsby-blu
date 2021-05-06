import React, { useCallback, useEffect, useState, createContext } from 'react'
import { useQuery } from 'urql'
import { SHOP_CURRENCIES } from '../queries/shop'

const STORAGE_CURRENCY_ID = 'currencyCode'

const initialValues = {
  currencyCode: 'CAD',
  setCurrencyCode: () => {},
}

export const CurrencyContext = createContext(initialValues)

const CurrencyProvider = props => {
  const [currencyCode, setCurrencyCode] = useState(initialValues.currencyCode)
  const [{ data }] = useQuery({ query: SHOP_CURRENCIES })

  useEffect(() => {
    const storageCurrency = localStorage.getItem(STORAGE_CURRENCY_ID)

    if (storageCurrency) {
      setCurrencyCode(storageCurrency)
    }
  }, [])

  useEffect(() => {
    const storageCurrency = localStorage.getItem(STORAGE_CURRENCY_ID)

    if (data && !storageCurrency) {
      localStorage.setItem(
        STORAGE_CURRENCY_ID,
        data.shop.paymentSettings.currencyCode
      )
    }
  }, [data])

  const setCurrency = useCallback(
    code => {
      setCurrencyCode(code)
      localStorage.setItem(STORAGE_CURRENCY_ID, code)
    },
    [setCurrencyCode]
  )

  return (
    <CurrencyContext.Provider
      value={{ currencyCode, setCurrency }}
      {...props}
    />
  )
}

export default CurrencyProvider
