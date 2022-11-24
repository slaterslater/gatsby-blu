import React, { useCallback, useEffect, useState, createContext } from 'react'
import { useQuery } from 'urql'
import store from 'store'
import axios from 'axios'
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
  // const geo = axios
  //   .post(process.env.GATSBY_GEOLOCATION_API)
  //   .then(res => res.data)

  // console.log({ geo })

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

  // look up guest location and set currency
  useEffect(() => {
    ;(async () => {
      const res = await axios.post(process.env.GATSBY_GEOLOCATION_API)
      // const code = data.shop.paymentSettings.enabledPresentmentCurrencies.find(
      // use above once currencies are set...
      const code = ['CAD', 'USD', 'GBP'].find(currency =>
        currency.startsWith(res.data.country)
      )
      if (!code) return
      setCurrency(code)
    })()
  }, [])

  return (
    <CurrencyContext.Provider
      value={{ countryCode, currencyCode, setCurrency }}
      {...props}
    />
  )
}

export default CurrencyProvider
