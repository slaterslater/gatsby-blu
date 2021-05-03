import gql from 'graphql-tag'

export const SHOP_CURRENCIES = gql`
  query {
    shop {
      paymentSettings {
        countryCode
        currencyCode
        enabledPresentmentCurrencies
      }
    }
  }
`
