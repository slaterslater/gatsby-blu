import { useContext } from 'react'
import { useFormattedPrice } from '../FormattedPrice'
import { ProductContext } from './ProductContext'

export const useVariantPrice = variant => {
  const { quantity = 1 } = useContext(ProductContext)

  const price = variant.priceV2?.amount || variant.price

  return useFormattedPrice({
    ...variant.priceV2,
    amount: price * quantity,
  })
}

const VariantPrice = ({ variant }) => useVariantPrice(variant)

export default VariantPrice

export const useVariantCompareAtPrice = variant => {
  const compareAtPrice = useFormattedPrice({
    ...variant.compareAtPrice,
  })
  return compareAtPrice?.endsWith('$0') ? null : compareAtPrice
}
