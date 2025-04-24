import { useContext } from 'react'
import { useFormattedPrice } from '../FormattedPrice'
import { ProductContext } from './ProductContext'
import { CurrencyContext } from '../../contexts/CurrencyContext'

export const useVariantPrice = variant => {
  const { quantity = 1 } = useContext(ProductContext)
  const { currencyCode } = useContext(CurrencyContext)

  const price = variant?.priceV2?.amount || variant?.price

  return useFormattedPrice({
    // ...variant.priceV2,
    currencyCode,
    amount: price * quantity,
  })
}

const VariantPrice = ({ variant }) => useVariantPrice(variant)

export default VariantPrice

export const useVariantCompareAtPrice = variant => {
  const { quantity = 1 } = useContext(ProductContext)

  const compareAtPrice = useFormattedPrice({
    ...variant?.compareAtPrice,
    amount: variant?.compareAtPrice?.amount * quantity,
  })
  return compareAtPrice?.endsWith('$0') ? null : compareAtPrice
}
