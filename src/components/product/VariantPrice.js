import { useContext } from 'react'
import { useFormattedPrice } from '../FormattedPrice'
import { ProductContext } from './ProductContext'

export const useVariantPrice = variant => {
  const { quantity } = useContext(ProductContext)

  return useFormattedPrice({
    ...variant.priceV2,
    amount: variant.priceV2.amount * quantity,
  })
}

const VariantPrice = ({ variant }) => useVariantPrice(variant)

export default VariantPrice
