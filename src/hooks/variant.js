import { useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'

export const useVariantPresentmentPrice = variant => {
  const { currencyCode } = useContext(CurrencyContext)

  const { node } = variant.presentmentPrices.edges.find(
    ({ node }) => node.price.currencyCode === currencyCode
  )

  return node.price
}

// export default useVariantPresentmentPrice
